package Servlet;

import DBCONN.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

public class svLista extends HttpServlet {
int x;
Connection conn;
PrintWriter out;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        {
            x=0;
            conn=Conexion.getConnect();
            String Session= Conexion.getSession();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
            JSONObject jsonObject=new  JSONObject();
            out.print("[");
             PreparedStatement prp; 
             /*Seleccion de base de datos*/
             try {
                prp = conn.prepareStatement("use Calculadora_Grafica");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
              Statement Comprobacion;
       String consulta= "select idPregunta, Nombre_pregunta, R_X, R_signo,R_Constante, C_X, C_Y, C_XSigno,C_YSigno,C_Constante,Coordenadas from ejercicios where fk_USERNAME='"+Session+"'";
    try {
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);

        while(ex.next()){
            if(x!=0){
                out.print(",");
            }
             jsonObject.put("ID",ex.getString(1));
             jsonObject.put("TITLE",ex.getString(2));
             jsonObject.put("XRECTA",ex.getString(3));
             jsonObject.put("SIGNORECTA",ex.getString(4));
             jsonObject.put("CONSRECTA",ex.getString(5));
             jsonObject.put("XCIRC",ex.getString(6));
             jsonObject.put("YCIRC",ex.getString(7));
             jsonObject.put("CIRCXSIGNO",ex.getString(8));
             jsonObject.put("CIRCYSIGNO",ex.getString(9));
             jsonObject.put("CIRCONS",ex.getString(10));
             jsonObject.put("COORD",ex.getString(11));
             out.print(jsonObject);
             x++;
        }
    } catch (SQLException ex) {
        out.print("Error:"+ex);
    }
    out.print("]");
    }
}
}

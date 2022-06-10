
package Servlet;

import DBCONN.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;


public class svInsert extends HttpServlet {

      Connection conn;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        conn = Conexion.getConnect();
        response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
        String TituloB=request.getParameter("TituloB");
        String R_XB=request.getParameter("R_XB");
        String R_signoB=request.getParameter("R_signoB");
        String R_constanteB=request.getParameter("R_constanteB");
        String C_XB=request.getParameter("C_XB");
        String C_YB=request.getParameter("C_YB");
        String C_XsignoB=request.getParameter("C_XsignoB");
        String C_YsignoB=request.getParameter("C_YsignoB");
        String C_constanteB=request.getParameter("C_constanteB");
        String Session= Conexion.getSession();
        JSONObject jsonObject=new  JSONObject();
        PreparedStatement prp;
        try {
          out.print("Titulo"+TituloB);
            prp = conn.prepareStatement("use Calculadora_Grafica");
            prp.executeUpdate();
        } catch (SQLException ex) {
            out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
        }
        PreparedStatement in;
        try {
           out.print("Titulo"+TituloB);
            in = conn.prepareStatement("INSERT INTO ejercicios(fk_USERNAME,Nombre_pregunta,R_X,R_signo,R_Constante,C_X, C_Y,C_XSigno,C_YSigno,C_constante,Coordenadas) values('"+Session+"','"+TituloB+"','"+R_XB+"','"+R_signoB+"','"+R_constanteB+"','"+ C_XB+"','"+ C_YB+"','"+ C_XsignoB+"','"+ C_YsignoB+"','"+ C_constanteB+"', '(0,0)'   );");
            in.executeUpdate();
            jsonObject.put("validacion","1");
        } catch (SQLException ex) {
            jsonObject.put("validacion",ex);
        }
        try{
     out.print("["+jsonObject+"]");
    }catch(Exception w){
    }
    }
}

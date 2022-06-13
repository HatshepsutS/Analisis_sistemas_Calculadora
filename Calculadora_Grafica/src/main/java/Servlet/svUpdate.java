
package Servlet;
import utilitiesMath.Coordenadas;
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

public class svUpdate extends HttpServlet {

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

        String id = request.getParameter("ID_Pregunta");
        String Session= Conexion.getSession();
        String Title = request.getParameter("Title");
        String R_X=request.getParameter("R_X");
        String R_signo=request.getParameter("R_signo");
        String R_constante=request.getParameter("R_constante");
        String C_X=request.getParameter("C_X");
        String C_Xsigno=request.getParameter("C_Xsigno");
        String C_Y=request.getParameter("C_Y");
        String C_Ysigno=request.getParameter("C_Ysigno");
        String C_constante=request.getParameter("C_constante");
        Coordenadas cor= new Coordenadas();
        String coordenadasRC =cor.getCoordenadas(Integer.parseInt(R_X),R_signo,Integer.parseInt(R_constante),Integer.parseInt(C_X),C_Xsigno,C_Ysigno,Integer.parseInt(C_Y),Integer.parseInt(C_constante));
        


        JSONObject jsonObject=new  JSONObject();
        PreparedStatement prp;
        /*Seleccion de base de datos*/
        try {
            prp = conn.prepareStatement("use Calculadora_Grafica");
            prp.executeUpdate();
        } catch (SQLException ex) {
            out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>"+ex);
        }
       
        PreparedStatement in;
        /*Actualizacion de base de datos y creacion de respuesta de confirmacion*/
        try {
            out.print("Titulo"+Title);
            in = conn.prepareStatement("update ejercicios set Nombre_pregunta='"+Title+"', R_X ='" + R_X  + "',R_signo='" + R_signo + "', R_Constante='" +  R_constante + "', C_X='" +C_X + "', C_Y='" +C_Y + "', C_XSigno='"+C_Xsigno+"', C_YSigno='"+C_Ysigno+"',C_Constante='"+C_constante+"', Coordenadas='"+coordenadasRC+"'   where idPregunta ='"+id+"';");
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
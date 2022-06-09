
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

public class svUpdate extends HttpServlet {

    Connection conn;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        /*Encabezados Generales y definicion de variables*/
        conn = Conexion.getConnect();
        response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
        String id = request.getParameter("ID_Pregunta");
        String title=request.getParameter("Titulo");
        String type=request.getParameter("Type");
        String x1=request.getParameter("X1");
        String y1=request.getParameter("Y1");
        String x2=request.getParameter("X2");
        String y2=request.getParameter("Y2");
        JSONObject jsonObject=new  JSONObject();
        PreparedStatement prp;
        /*Seleccion de base de datos*/
        try {
            prp = conn.prepareStatement("use CRUD2");
            prp.executeUpdate();
        } catch (SQLException ex) {
            out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>"+ex);
        }
       
        PreparedStatement in;
        /*Actualizacion de base de datos y creacion de respuesta de confirmacion*/
        try {
            out.print("Titulo"+title+"\nTipo:"+type);
            in = conn.prepareStatement("update preguntas set Titulo='"+title+"', Tipo='" + type + "',X1='" + x1 + "',Y1='" + y1 + "',X2='" + x2 + "',Y2='" + y2 + "'   where ID_Pregunta='"+id+"';");
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
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlet;

import DBCONN.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import static java.lang.Math.abs;
import static java.lang.Math.sqrt;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

public class svEjercicio extends HttpServlet {
Connection conn;
PrintWriter out;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        {
            /*Encabezados Generales*/
            conn=Conexion.getConnect();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
            String id=request.getParameter("ID_Modificar");
            JSONObject jsonObject=new  JSONObject();
             PreparedStatement prp; 
             /*Seleccion de base de datos*/
             try {
                prp = conn.prepareStatement("use CRUD2");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
             /*Consulta de datos*/
              Statement Comprobacion;
        String consulta="SELECT Titulo,Tipo,X1,Y1,X2,Y2,File from preguntas where ID_Pregunta='"+id+"';";
        /*Creacion de objeto JSON con los elementos de consultados de la pregunta
        Calculamos los resultados de la pregunta en el servlet para evitar cambios en front-end*/
    try {
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);
        while(ex.next()){
             jsonObject.put("TITLE",ex.getString(1));
             jsonObject.put("COORDX1",ex.getString(3));
             jsonObject.put("COORDY1",ex.getString(4));
             jsonObject.put("COORDX2",ex.getString(5));
             jsonObject.put("COORDY2",ex.getString(6));
              if(ex.getString(2).equals("1")){
                 jsonObject.put("TYPE","Calcula la pendiente");
             }else{
                 jsonObject.put("TYPE","Calcula la distancia");
             }             
             if(ex.getString(2).equals("1")){
                 double x1=Double.parseDouble(ex.getString(3));
                 double y1=Double.parseDouble(ex.getString(4));
                 double x2=Double.parseDouble(ex.getString(5));
                 double y2=Double.parseDouble(ex.getString(6));
                 double Resultado=(y2-y1)/(x2-x1);
                 DecimalFormat formato2 = new DecimalFormat("#.##");
                 jsonObject.put("Resultado",formato2.format(Resultado));
             }else{
                 double x1=Double.parseDouble(ex.getString(3));
                 double y1=Double.parseDouble(ex.getString(4));
                 double x2=Double.parseDouble(ex.getString(5));
                 double y2=Double.parseDouble(ex.getString(6));
                 double Resultado=sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2));
                 DecimalFormat formato2 = new DecimalFormat("#.##");
                 jsonObject.put("Resultado",formato2.format(Resultado));
             }
                jsonObject.put("fp",ex.getString(7));             
        }
    } catch (SQLException ex) {
        out.print("Error:"+ex);
    }
    out.print("["+jsonObject+"]");
    }
}
}

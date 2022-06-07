/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

/**
 *
 * @author andyl
 */
public class svCharge extends HttpServlet {
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
              Statement Comprobacion;
        String consulta="SELECT Titulo,Tipo,X1,Y1,X2,Y2 from preguntas where ID_Pregunta='"+id+"';";
        /*Consulta de servlet a base de datos para obtener los campos requeridos a la hora de modificar una pregunta por medio del componente modifica de react*/
    try { 
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);
        while(ex.next()){
             jsonObject.put("TITLE",ex.getString(1));
             if(ex.getString(2).equals("1")){
                 jsonObject.put("TYPE","Calculo de Pendiente");
             }else{
                 jsonObject.put("TYPE","Calculo de la distancia");
             }             
             jsonObject.put("COORDX1",ex.getString(3));
             jsonObject.put("COORDY1",ex.getString(4));
             jsonObject.put("COORDX2",ex.getString(5));
             jsonObject.put("COORDY2",ex.getString(6));

/*Escritura de un objeto JSON para el almacenamiento y acceso a los datos de la pregunta*/
        }
    } catch (SQLException ex) {
        out.print("Error:"+ex);
    }
    out.print("["+jsonObject+"]");
    }
}

}

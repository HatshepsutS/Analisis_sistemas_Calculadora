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
       
            conn=Conexion.getConnect();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
            String id=request.getParameter("ID_Modificar");
            JSONObject jsonObject=new  JSONObject();
             PreparedStatement prp; 
             try {
                prp = conn.prepareStatement("use Calculadora_Grafica");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
              Statement Comprobacion;
              String consulta= "select Nombre_pregunta, R_X, R_signo,R_Constante, C_X, C_Y, C_XSigno,C_YSigno,C_Constante,Coordenadas from ejercicios where idPregunta='"+id+"'";
        /*Consulta de servlet a base de datos para obtener los campos requeridos a la hora de modificar una pregunta por medio del componente modifica de react*/
    try { 
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);
        while(ex.next()){
        
            jsonObject.put("TITLE",ex.getString(1));
             jsonObject.put("XRECTA",ex.getString(2));
          
            if(ex.getString(3).equals("1")){
                 jsonObject.put("SIGNORECTA","+");
             }else{
                 jsonObject.put("SIGNORECTA","-");
             }   
             jsonObject.put("CONSRECTA",ex.getString(4));
             jsonObject.put("XCIRC",ex.getString(5));
             jsonObject.put("YCIRC",ex.getString(6));
   
             if(ex.getString(7).equals("1")){
                 jsonObject.put("CIRCXSIGNO","+");
             }else{
                 jsonObject.put("CIRCXSIGNO","-");
             }

             if(ex.getString(8).equals("1")){
                 jsonObject.put("CIRCYSIGNO","+");
             }else{
                 jsonObject.put("CIRCYSIGNO","-");
             }

             jsonObject.put("CIRCONS",ex.getString(9));
             jsonObject.put("COORD",ex.getString(10));
      
        }
    } catch (SQLException ex) {
        out.print("Error:"+ex);
    }
    out.print("["+jsonObject+"]");
    }
}

}

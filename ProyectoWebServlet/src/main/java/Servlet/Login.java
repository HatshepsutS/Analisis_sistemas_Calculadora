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
public class Login extends HttpServlet {
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
            String usr = request.getParameter("User");
            String pass = request.getParameter("password");
            JSONObject jsonObject=new  JSONObject();
             PreparedStatement prp; 
             try {
                prp = conn.prepareStatement("use crud2");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
              Statement Comprobacion;
        String consulta="select * from usuarios where USERNAME='"+usr+"' and PASSWORD='"+pass+"';";
    try {
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);
        if(ex.next()){
             jsonObject.put("usuario",ex.getString(1));
             System.out.println(ex.getString(1));
        }
        else{
            jsonObject.put("usuario","error");
             System.out.println(ex.getString(1));
        }
    } catch (SQLException ex) {
        jsonObject.put("usuario","error");
    }
    try{
     
     out.print("["+jsonObject+"]");
    }catch(Exception w){
        
    }
    }
}

}

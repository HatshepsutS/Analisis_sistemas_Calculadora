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
public class svLista extends HttpServlet {
int x;
Connection conn;
PrintWriter out;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        {
            /*Encabezados Generales*/
            x=0;
            conn=Conexion.getConnect();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
            JSONObject jsonObject=new  JSONObject();
            out.print("[");
             PreparedStatement prp; 
             /*Seleccion de base de datos*/
             try {
                prp = conn.prepareStatement("use CRUD2");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
              Statement Comprobacion;
        String consulta="select ID_Pregunta,Titulo,Tipo,X1,Y1,X2,Y2 from preguntas;";
    try {
        Comprobacion=conn.createStatement();
        ResultSet ex=Comprobacion.executeQuery(consulta);
        /*Creacion de Listas JSON con los elementos de cada una de las preguntas*/
        while(ex.next()){
            if(x!=0){
                out.print(",");
            }
             jsonObject.put("ID",ex.getString(1));
             jsonObject.put("TITLE",ex.getString(2));
             jsonObject.put("TYPE",ex.getString(3));
             jsonObject.put("COORDX1",ex.getString(4));
             jsonObject.put("COORDY1",ex.getString(5));
             jsonObject.put("COORDX2",ex.getString(6));
             jsonObject.put("COORDY2",ex.getString(7));
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
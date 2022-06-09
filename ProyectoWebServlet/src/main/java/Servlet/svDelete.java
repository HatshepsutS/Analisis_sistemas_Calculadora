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
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class svDelete extends HttpServlet {

    Connection conn;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        /*Encabezados Generales*/
        conn = Conexion.getConnect();
        response.addHeader("Access-Control-Allow-Origin", "*");
            response.setCharacterEncoding("utf8");
            response.setContentType("application/json");
            out = response.getWriter();
        String id = request.getParameter("ID_Pregunta");
        PreparedStatement prp;
        /*Seleccion de base de datos*/
        try {
            prp = conn.prepareStatement("use CRUD2");
            prp.executeUpdate();
        } catch (SQLException ex) {
            out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
        }
       /*Eliminacion de elemento en la base de datos por medio del id obtenido*/
        PreparedStatement in;
        try {
            in = conn.prepareStatement("delete from preguntas where ID_Pregunta='"+id+"';");
            in.executeUpdate();
            response.sendRedirect("/ProyectoWebServlet");
        } catch (SQLException ex) {
            out.println("<h2>ERROR. No se pudo realizar la insercion</h2>");
            response.sendRedirect("/ProyectoWebServlet");
        }
        
    }
}

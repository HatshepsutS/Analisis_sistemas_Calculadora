/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlet;

import DBCONN.Conexion;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class svUpFile extends HttpServlet {
   private boolean isMultipart;
   private String filePath;
   private int maxFileSize = 100 *1024*1024;
   private int maxMemSize = 4 * 1024;
   private File file ;
   Connection conn;
   String id;
    public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, java.io.IOException {
        conn = Conexion.getConnect();
   
      // Check that we have a file upload request
      
      filePath = request.getRealPath("/"); 
      isMultipart = ServletFileUpload.isMultipartContent(request);
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setCharacterEncoding("utf8");
      response.setContentType("text/html");
      java.io.PrintWriter out = response.getWriter( );
      if( !isMultipart ) {
         out.println("<html>");
         out.println("<head>");
         out.println("<title>Servlet upload</title>");  
         out.println("</head>");
         out.println("<body>");
         out.println("<p>No se subio el archivo</p>"); 
         out.println("</body>");
         out.println("</html>");
         return;
      }
  
      DiskFileItemFactory factory = new DiskFileItemFactory();
   
      // maximum size that will be stored in memory
      factory.setSizeThreshold(maxMemSize);
   
      // Location to save data that is larger than maxMemSize.
      factory.setRepository(new File(filePath));

      // Create a new file upload handler
      ServletFileUpload upload = new ServletFileUpload(factory);
   
      // maximum file size to be uploaded.
      upload.setSizeMax( maxFileSize );

      try { 
         // Parse the request to get file items.
         List fileItems = upload.parseRequest(request);
	
         // Process the uploaded file items
         Iterator i = fileItems.iterator();

         out.println("<html>");
         out.println("<head>");
         out.println("<title>Servlet upload</title>");  
         out.println("</head>");
         out.println("<body>");
   
         while ( i.hasNext () ) {
            FileItem fi = (FileItem)i.next();
            if ( !fi.isFormField () ) {
               // Get the uploaded file parameters
               String fieldName = fi.getFieldName();
               String fileName = fi.getName();
               String contentType = fi.getContentType();
               boolean isInMemory = fi.isInMemory();
               long sizeInBytes = fi.getSize();
            
               // Write the file
               if( fileName.lastIndexOf("\\") >= 0 ) {
                  file = new File( filePath +"MultiM/"+ fileName.substring( fileName.lastIndexOf("\\"))) ;
               } else {
                  file = new File( filePath +"MultiM/"+ fileName.substring(fileName.lastIndexOf("\\")+1)) ;
               }
               fi.write( file ) ;
               out.println("Archivo subido: " + fileName + "<br />Subido en"+filePath);
               PreparedStatement prp;
               /*Seleccion de base de datos*/
               try {
                prp = conn.prepareStatement("use CRUD2");
                prp.executeUpdate();
            } catch (SQLException ex) {
                out.println("<h2>ERROR. No se pudo acceder a la base de datos</h2>");
            }
              Statement Comprobacion;
              String consulta="select ID_Pregunta from preguntas;";
                try {
                Comprobacion=conn.createStatement();
                ResultSet ex=Comprobacion.executeQuery(consulta);
                while(ex.next()){
                    id=ex.getString(1);
                }
                 
            } catch (SQLException ex) {
                out.print("Error:"+ex);
            }
                String ruta="../MultiM/"+fileName;
                ruta=ruta.replace("\\", "/");
                out.println("El ID es: "+id);
                PreparedStatement in;
        try {
            in = conn.prepareStatement("update preguntas set File='"+ruta+"' where ID_Pregunta='"+id+"';");
            in.executeUpdate();
        } catch (SQLException ex) {
            
        } out.println(ruta);
            }
         }
         out.println("</body>");
         out.println("</html>");
         } catch(Exception ex) {
            System.out.println(ex);
            out.println("Hubo un error"+ex);
         }
         
        response.sendRedirect("/ProyectoWebServlet");
      
      }
      
      public void doGet(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, java.io.IOException 
      {

         throw new ServletException("GET method used with " +
            getClass( ).getName( )+": POST method required.");
      }

}

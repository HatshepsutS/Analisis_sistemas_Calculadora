/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package DBCONN;
import java.sql.Connection;
import java.sql.DriverManager;
import javax.swing.JOptionPane;

public class Conexion {

    private static String db= "Calculadora_Grafica";
    private static String user="root";
    private static String pass="1234";
    private static String url="jdbc:mysql://localhost/"+db;
    private static Connection conn;
    public static String sesion_user; 
  public static Connection getConnect(){
      try{
          Class.forName("com.mysql.jdbc.Driver");
conn=DriverManager.getConnection(url,user,pass);
                  
      }catch(Exception e){
             JOptionPane.showMessageDialog(null,"Error"+e.getMessage());
              
              }
      return conn;
    }


   public  static void  setSession (String usuario ){
    sesion_user=usuario;
  }
   public static String getSession ( ){
   return  sesion_user;
  }




}

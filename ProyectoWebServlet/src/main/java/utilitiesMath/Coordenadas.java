

package utilitiesMath;
import org.apache.commons.math3.util.Precision;
import java.util.*;
import java.util.List;
import java.util.Arrays;

public class Coordenadas {
//Pasos a seguir 
    //(x-a)^2 + (y-b)^2= r^2
    // y= ax+b
    //(x-a)^2 +((ax+b)-b)^2= r^2
    //(x-a)^2 +((ax+b)-b)^2= r^2
    //(x-C_X)^2 +((R_X+ R_Constante)-C_Y)^2= C_Constante
    //(x-C_X)^2 +(R_X +R_Constante-C_Y)^2= C_Constante

 public static String getCoordenadas(int R_X , String R_signo,int R_Constante,int C_X,String C_XSigno, String C_YSigno, int C_Y, int  C_Constante){
    double y;
    ArrayList<Integer> binomio1 = new ArrayList<Integer>();
    ArrayList<Integer> binomio2 = new ArrayList<Integer>();
    ArrayList<Integer> ecuacion = new ArrayList<Integer>();
    String Coordenadas;
    if (C_XSigno=="1"){
        C_X=C_X-(2*C_X);     
     }
    if (R_signo=="2"){
        R_Constante=R_Constante-2*R_Constante;     
     }

     if (C_YSigno=="1"){
        C_Y=C_Y-(2*C_Y); }  
 
   C_Constante=C_Constante-2*C_Constante;
   binomio1= binomioalcuadrado(1,-C_X);
   binomio2= binomioalcuadrado(R_X,R_Constante-C_Y);    
       for (int x = 0; x<3; x++){
            ecuacion.add(binomio1.get(x)+binomio2.get(x)) ;
            }
   int aux= ecuacion.get(2);
   ecuacion.remove(2);
   ecuacion.add(aux+C_Constante);
   double resultados[] = ecuacion2Grado(ecuacion.get(0),ecuacion.get(1), ecuacion.get(2));
  
if (resultados == null) {
        Coordenadas="No tiene solucion";
    } else {
        if (resultados.length<2){ 
            y= Precision.round(R_X*resultados[0]+R_Constante,2);
            Coordenadas="("+resultados[0]+","+y+")";
         }
         else {
            y=Precision.round(R_X*resultados[0]+R_Constante,2);
            Coordenadas="("+resultados[0]+","+y+")";
             y= Precision.round( R_X*resultados[1]+R_Constante,2);
             Coordenadas+=",("+resultados[1]+","+y+")";         
            }
    }
         return(Coordenadas); 
 }




public static ArrayList<Integer> binomioalcuadrado(int a, int b){ 
    int q,w,e;
    q=a*a;
    w=2*a*b;
    e=b*b;
     ArrayList<Integer> i = new ArrayList<Integer>(Arrays.asList(q,w,e));
    return i; 
} 

public static double[] ecuacion2Grado(int a, int b, int c) {
 
    double discriminante = (Math.pow(b, 2) - (4 * a * c));
    if (discriminante >= 0) {
        double soluciones[];
        if(discriminante == 0){
            soluciones = new double[1];
            soluciones[0] = ((-b) - (4 * a * c)) / (2 * a);
        }else{
            soluciones = new double[2];
            soluciones[0] =Precision.round(((-b) + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a),2);
            soluciones[1] = Precision.round(((-b) - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a),2);
        }
        return soluciones;
    } else {
        return null;
    }
}






}

import React, { useLayoutEffect } from "react";
import functionPlot from "function-plot";






export default function Grafica({ a_circ=1,a_csigno='+',b_circ=1,b_csigno='+',radioc=2.23,a_rect=1,b_rect=1,signorecta='+'}) {
  useLayoutEffect(() => {
console.log("a_circ: "+a_circ+" b_circ: "+b_circ+" radioc: "+radioc+" a_rect: "+a_rect +"b_rect: "+b_rect);
let width = 400;
let height = 400;
let maxX = Number(radioc) * Number(radioc) +Number(radioc);
let maxY = Number(radioc) * Number(radioc) +Number(radioc);
const root = document.querySelector("#plot");
let LimitArea =  Math.abs(maxX) >= Math.abs(maxY) ? Math.abs(maxX) : Math.abs(maxY);
console.log("LimitArea: "+LimitArea);
    functionPlot({
      target: root,
      width,
      height,
      yAxis: { domain: [-LimitArea, LimitArea] },
      xAxis: { domain: [-LimitArea, LimitArea] },
      grid: true,
      data: [
        {
          fn: "(x"+a_csigno+a_circ+")^2+(y"+b_csigno+a_circ+")^2-"+radioc+"^2",
          
          fnType: "implicit"
        },

        {
          fn: a_rect+"x"+signorecta+b_rect+"-y",
          fnType: "implicit"
        }
      ]
    });
    
  }, []);
  
    return (
      <div id="plot"></div>
      
    )
  }
  
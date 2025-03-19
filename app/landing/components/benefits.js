// const Benefits = () => {
//     return (
//         <div className="absolute w-[1441px] h-[803px] top-[183px] left-0 [background:linear-gradient(180deg,rgb(255,255,255)_85.67%,rgb(210,229,255)_98.17%)]">
//             <div className="absolute w-[1025px] h-[301px] top-[321px] left-[209px]">
//               {benefits.map((benefit, index) => (
//                 <Card
//                   key={index}
//                   className={`absolute w-${index === 1 ? "468" : index === 2 ? "428" : "399"}px h-[120px] ${index === 0 ? "top-0 left-0" : index === 1 ? "top-0 left-[559px]" : "top-[181px] left-[254px]"}`}
//                 >
//                   <CardContent className="p-0">
//                     <div
//                       className={`absolute w-[121px] h-[120px] top-0 left-0 ${index === 0 ? "bg-colorspurple-100" : index === 1 ? "bg-[#ffd6c0]" : "bg-[#d2e5ff]"} rounded-2xl`}
//                     >
//                       {benefit.icon}
//                     </div>
//                     <div
//                       className={`absolute w-${index === 1 ? "325" : index === 2 ? "285" : "257"}px h-${index === 2 ? "89" : index === 1 ? "105" : "103"}px top-${index === 0 || index === 2 ? "2" : "0"} left-${index === 0 || index === 2 ? "140" : "141"}px font-normal text-[#000000] text-sm tracking-[0] leading-[normal] font-['Poppins-Bold',Helvetica]`}
//                     >
//                       <span className="font-bold">
//                         {benefit.title}
//                         <br />
//                       </span>
//                       <span className="font-['Poppins-Regular',Helvetica]">
//                         {benefit.description}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <div className="absolute w-[1048px] h-[150px] top-[87px] left-[141px]">
//               <div className="relative w-[1044px] h-[150px]">
//                 <div className="absolute w-[1044px] top-0 left-0 font-normal text-semantic-link-primary text-[50px] tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
//                   ¿Sabes por qué adoptar es una de las decisiones más
//                   gratificantes?
//                 </div>
//                 <div className="w-2 top-[94px] left-[726px] font-normal text-app-primary text-[51px] tracking-[0] whitespace-nowrap absolute leading-[normal] font-['Poppins-Regular',Helvetica]">
//                   .
//                 </div>
//               </div>
//             </div>
//           </div>
//     )
// }
// landing/components/benefits.jsx
export function Benefits({ benefits }) {
    return (
      <div className="benefits-section">
        {benefits.map((benefit, index) => (
          <div key={index}>
            {benefit.icon}
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    );
  }
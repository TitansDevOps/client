import Image from 'next/image';
import { Input } from '@/components/ui/input';

export const ContactSection = () => {
  return (
    <div className="absolute w-[1441px] h-[3598px] top-[820px] left-0">
      <div className="absolute w-[1440px] h-[900px] top-[2698px] left-0 bg-[color:var(--primitive-color-neutral-white)] rounded-[0px_0px_100px_100px] overflow-hidden">
        <div className="relative w-[1188px] h-[1185px] top-[-101px] left-[142px]">
          <div className="absolute w-[455px] h-[552px] top-[297px] left-[733px]">
            <div className="absolute w-[446px] h-[45px] top-10 left-0 rounded-[50px] border border-solid border-[#656ed3]">
              <Input placeholder="" />
            </div>
            <div className="absolute w-[446px] h-[45px] top-[140px] left-0 rounded-[50px] border border-solid border-[#656ed3]">
              <Input placeholder="" />
            </div>
            <div className="absolute w-[446px] h-[216px] top-[262px] left-0.5 rounded-[20px] border border-solid border-[#656ed3]">
              <Textarea placeholder="" />
            </div>
            <div className="absolute w-24 top-0 left-0 font-normal text-[#000000] text-base tracking-[0] leading-[normal] font-['Inter-Regular',Helvetica]">
              Full Name:
            </div>

            <div className="absolute w-[173px] h-[38px] top-[514px] left-[271px]">
              <Button className="w-[173px] h-[38px] bg-app-primary rounded-xl">
                <span className="font-bold text-[color:var(--primitive-color-neutral-white)] text-base tracking-[0] leading-[normal] font-['Poppins-Bold',Helvetica]">
                  Enviar
                </span>
              </Button>
            </div>

            <div className="absolute w-[55px] top-[101px] left-0.5 font-normal text-[#000000] text-base tracking-[0] leading-[normal] font-['Inter-Regular',Helvetica]">
              Email:
            </div>

            <div className="absolute w-[89px] top-[222px] left-[5px] font-normal text-[#000000] text-base tracking-[0] leading-[normal] font-['Inter-Regular',Helvetica]">
              Message:
            </div>
          </div>

          <div className="absolute w-[714px] h-[748px] top-[437px] left-[19px]">
            <div className="relative h-[748px]">
              <div className="absolute w-[478px] h-[454px] top-[63px] left-[236px] opacity-[0.47]">
                <div className="relative w-[481px] h-[451px] top-px -left-px">
                  <div className="absolute w-[444px] h-[106px] top-[135px] left-[-22px] bg-[#838cf1] rounded-[105.53px] rotate-[-42.14deg]" />
                  <div className="absolute w-[412px] h-[98px] top-[228px] left-[89px] bg-[#afb3ff] rounded-[105.53px] rotate-[-42.14deg]" />
                </div>
              </div>

              <div className="w-[593px] h-[593px] top-[155px] bg-[#8dbdfc] rounded-[296.5px] absolute left-0" />

              <Image
                className="absolute w-[659px] h-[564px] top-0 left-0 object-cover"
                alt="Long haired girl"
                src="/images/long-haired-girl.png"
                width={659}
                height={564}
              />
            </div>
          </div>

          <div className="absolute w-[478px] h-[454px] top-0 left-[310px] opacity-[0.47]">
            <div className="relative w-[481px] h-[451px] top-px -left-px">
              <div className="absolute w-[444px] h-[106px] top-[135px] left-[-22px] bg-[#838cf1] rounded-[105.53px] rotate-[-42.14deg]" />
              <div className="absolute w-[412px] h-[98px] top-[228px] left-[89px] bg-[#afb3ff] rounded-[105.53px] rotate-[-42.14deg]" />
            </div>
          </div>

          <div className="absolute w-[512px] h-[187px] top-[322px] left-0">
            <div className="absolute top-[163px] left-0 font-bold text-app-primary text-base tracking-[0] leading-[normal] font-['Poppins-Bold',Helvetica]">
              ¡Qué bueno saber de ti!
            </div>

            <div className="flex flex-wrap w-[510px] items-start gap-[11px_-87px] absolute top-0 left-0">
              <div className="relative w-fit mt-[-1.00px] mr-[-36.00px] font-normal text-transparent text-5xl tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
                <span className="text-[#000000]">Sigamos en </span>
                <span className="font-bold text-[#ff4f11] font-['Poppins-Bold',Helvetica]">
                  Contacto!
                </span>
              </div>

              <div className="relative w-[340px] font-normal text-[#191919] text-[13px] tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
                ¿Tienes preguntas o necesitas ayuda?
                <br />
                Contáctanos por correo, teléfono o mediante el formulario.
                ¡Estamos aquí para ayudarte a encontrar a tu compañero
                perfecto!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


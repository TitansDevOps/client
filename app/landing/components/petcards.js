const PetCards = ({petCards}) => {
    return(
        <div className="w-[1440px] h-[821px] top-[979px] overflow-hidden [background:linear-gradient(180deg,rgb(255,255,255)_0%,rgb(210.02,229.47,255)_18.67%)] absolute left-0">
            <Button className="flex items-center gap-4 p-6 absolute top-[638px] left-[533px] bg-app-primary rounded-[13px]">
              <span className="relative w-fit mt-[-1.00px] font-body-body-paragraph-bold font-[number:var(--body-body-paragraph-bold-font-weight)] text-[#ffffff] text-[length:var(--body-body-paragraph-bold-font-size)] tracking-[var(--body-body-paragraph-bold-letter-spacing)] leading-[var(--body-body-paragraph-bold-line-height)] [font-style:var(--body-body-paragraph-bold-font-style)]">
                Conoce mas mascotas
              </span>
              <ArrowRight className="w-7 h-6" />
            </Button>

            <div className="absolute w-[1382px] h-[75px] top-[63px] left-[141px] font-normal text-transparent text-[50px] tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
              <span className="text-[#000000]">
                Encuentra a tu compañero perfecto
              </span>
              <span className="text-[#ff4f11]">.</span>
            </div>

            <div className="absolute w-[1269px] h-[317px] top-[253px] left-[102px]">
              <div className="inline-flex items-center gap-[51px] px-[30px] py-0 top-0 absolute left-0">
                {/* First card (background image) */}
                <div className="relative w-[255.73px] h-[316.62px]">
                  <div className="relative w-[312px] h-[373px] -top-6 -left-7 bg-[url(/group-38.png)] bg-[100%_100%]">
                    <div className="relative w-[26px] h-[26px] top-[271px] left-[241px] bg-[#f672e133] rounded-[13px]">
                      <Venus className="absolute w-[13px] h-[22px] top-0.5 left-[7px]" />
                    </div>
                  </div>
                </div>

                {/* Pet cards */}
                {petCards.map((pet) => (
                  <Card
                    key={pet.id}
                    className="relative w-64 h-[317px] bg-white-color rounded-lg"
                  >
                    <CardContent className="p-0">
                      <div className="absolute w-64 h-[227px] top-0 left-0  bg-[100%_100%]">
                        <div className="absolute w-7 h-7 top-[19px] left-[207px] bg-white-color rounded-lg shadow-[0px_4px_18px_#152c4e0d]">
                          <Heart className="absolute w-4 h-3.5 top-[6px] left-[6px]" />
                        </div>
                      </div>

                      <div className="absolute w-[104px] top-[251px] left-[21px] font-semibold text-pet-adopt-colorblack-color-pet-dopt text-sm tracking-[0.14px] leading-[14px] font-['Poppins-SemiBold',Helvetica]">
                        {pet.name}
                      </div>

                      <div className="absolute w-[158px] h-[22px] top-[274px] left-[18px]">
                        <div className="absolute w-[129px] top-1 left-[27px] opacity-50 font-normal text-pet-adopt-colorblack-color-pet-dopt text-[10px] tracking-[0] leading-[10px] font-['Poppins-Regular',Helvetica]">
                          {pet.location}
                        </div>
                        <MapPin className="absolute w-[22px] h-[22px] top-0 left-0" />
                      </div>

                      <div className="absolute w-[29px] h-[29px] top-[245px] left-[211px] bg-[#8eb1e533] rounded-[14.52px]">
                        {pet.gender === "male" ? (
                          <Mars className="absolute w-[18px] h-[18px] top-1.5 left-1.5" />
                        ) : (
                          <Venus className="absolute w-[18px] h-[18px] top-1.5 left-1.5" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
    )
}
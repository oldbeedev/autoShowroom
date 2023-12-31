"use client";
import { CarProps } from "@/types";
import { calculateCarRent, getData } from "@/utilty/db";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CarDetails, CustomButton } from "./index";

interface CarCardProps {
  car: CarProps;
}
const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carImage, setCarImage] = useState("");

  useEffect(() => {
    const fetchCarImage = async () => {
      const image = await getData(car);
      const onlyImage = image[0].src.medium;

      setCarImage(onlyImage);
    };
    fetchCarImage();
  }, [car]);
  const { city_mpg, year, make, model, transmission, drive } = car;

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      {carImage ? (
        <div className="relative w-full h-40 my-3 object-contain">
          <Image
            alt="car model"
            fill
            priority
            className="object-contain"
            src={carImage}
          />
        </div>
      ) : (
        <div className="relative w-full h-40 my-3 object-contain">
          <Image
            alt="car model"
            fill
            priority
            className="object-contain"
            src="/hero.png"
          />
        </div>
      )}

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering whell"
              width={20}
              height={20}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manuel"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px]
            "
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;

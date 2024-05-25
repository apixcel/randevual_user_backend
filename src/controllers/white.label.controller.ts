import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import shopModel from "../models/shop.model";
import whiteLabelModel from "../models/white.label.model";

export const createWhiteLabelController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { shopId, label_id } = req.body;
    const userId = req.user?._id;
    
    if (!userId) {
      return res
        .status(200)
        .json({ success: "false", message: "You are not authorized" });
    }

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const shop = await shopModel
          .findById(shopId)
          .populate("categories")
          .populate("team")
          .populate("services")
          .populate("reviews");

        if (!shop) {
          return res.status(422).json({
            errors: "Shop not found here",
          });
        }
        const exsit = await whiteLabelModel.findOne({
          shopId,
        });
        if (exsit) {
          return res.status(422).json({
            errors: "This white label already exsit!. Please try another",
          });
        }

        const template = `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>${shop?.shopName}</title>
  </head>
  <body class="__className_aaf875">
    <main
      class="max-w-[1440px] mx-auto px-[10px] sm:px-[20px] md:px-[25px] xl:px-[30px]"
    >
      <section>
        <div class="flex justify-between items-end">
          <div class="mt-[20px]">
            <h2 class="text-[26px] md:text-[48px] font-bold">${shop?.shopName}</h2>
            <div
              class="flex flex-wrap lg:flex-nowrap gap-x-[20px] text-[17px] font-medium mt-[8px]"
            >
              <div class="flex gap-[8px] relative">
                <p class="">5</p>
                <div class="flex mt-[2px]">
                  <div class="w-[17px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[17px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[17px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[17px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[17px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p class="text-primary_dark">(547)</p>
                <span
                  class="absolute w-1 h-1 bg-secondaryTxt rounded-full top-[45%] right-[-12px]"
                ></span>
              </div>
              <p class="text-secondaryTxt relative">
                Open until ${shop?.offHour}
                <span
                  class="absolute w-1 h-1 bg-secondaryTxt rounded-full top-[45%] right-[-12px]"
                ></span>
              </p>
              <p class="text-secondaryTxt relative">
                ${shop?.location}
                <span
                  class="absolute w-1 h-1 bg-secondaryTxt rounded-full top-[45%] right-[-12px]"
                ></span>
              </p>
              <a class="text-primary_dark" href="/">Get Directions</a>
            </div>
          </div>
          <div class="flex gap-[16px]">
            <button
              class="w-[38px] h-[38px] border border-borderColor rounded-full flex justify-center items-center hover:bg-borderColor customTransition"
            >
              <div class="w-[22px]">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.47.97a.75.75 0 0 1 1.06 0l3.938 3.937a.75.75 0 0 1-1.06 1.06L12.75 3.312V12a.75.75 0 0 1-1.5 0V3.31L8.593 5.969a.75.75 0 0 1-1.06-1.06L11.47.97ZM4.19 8.69a1.5 1.5 0 0 1 1.06-.44H7.5a.75.75 0 0 1 0 1.5H5.25v9.75h13.5V9.75H16.5a.75.75 0 0 1 0-1.5h2.25a1.5 1.5 0 0 1 1.5 1.5v9.75a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V9.75c0-.398.158-.78.44-1.06Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div></button
            ><button
              class="w-[38px] h-[38px] border border-borderColor rounded-full flex justify-center items-center hover:bg-borderColor customTransition"
            >
              <div class="w-[22px]">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.116 19.952c.45.303.826.54 1.091.7.132.08.349.207.422.25a.76.76 0 0 0 .739.002c.076-.045.295-.172.425-.251a30.34 30.34 0 0 0 4.396-3.267c2.365-2.129 4.936-5.228 4.936-8.761A5.625 5.625 0 0 0 12 5.25 5.625 5.625 0 0 0 1.875 8.625c0 3.533 2.571 6.632 4.936 8.76a30.343 30.343 0 0 0 3.305 2.567ZM9.44 4.984a4.125 4.125 0 0 0-6.064 3.641c0 2.842 2.116 5.555 4.44 7.646A28.858 28.858 0 0 0 12 19.379a28.858 28.858 0 0 0 4.186-3.108c2.323-2.09 4.439-4.804 4.439-7.646a4.125 4.125 0 0 0-7.933-1.587.75.75 0 0 1-1.384 0 4.125 4.125 0 0 0-1.87-2.054Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-[20px] mt-[20px]">
          <div class="col-span-2 row-span-2 bg-primary">
            <video
              controls=""
              autoplay=""
              loop=""
              class="w-full h-full rounded"
            >
              <source src=${shop?.media?.gallery?.e2} />
            </video>
          </div>
          <div class="aspect-video">
            <img
              alt=""
              loading="lazy"
              width="600"
              height="600"
              decoding="async"
              data-nimg="1"
              class="w-full h-full object-cover"
              src=${shop?.media?.gallery?.f1}
              style="color: transparent"
            />
          </div>
          <div class="aspect-video">
            <img
              alt=""
              loading="lazy"
              width="600"
              height="600"
              decoding="async"
              data-nimg="1"
              class="w-full h-full object-cover"
              src=${shop?.media?.gallery?.f2}
              style="color: transparent"
            />
          </div>
        </div>
      </section>
      <section>
        <h4 class="text-[24px] md:text-[44px] pt-[40px] font-bold">Services</h4>
        <div class="flex flex-col md:flex-row h-fit gap-[40px]">
          <div class="w-full h-fit">
            <div
              class="relative w-full"
            >
              <div
                class="flex gap-[16px] overflow-x-auto mt-[20px] w-[70%] md:w-[84%] lg:w-[90%] mx-auto"
                style="scrollbar-width: none"
              >
                <button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap bg-violet-600 text-white border-violet-600"
                >
                  Beauty Salon</button
                >
                
                <button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Facial</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Dermaplaning</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Chemical Peel</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Makeup Service</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Skin Consultaion</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Bridal Makeup</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Facial Massage</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Facial Treatment</button
                ><button
                  class="rounded-[28px] border-2 customTransition text-[13px] md:text-[15px] px-[20px] py-[8px] text-nowrap whitespace-no-wrap border-borderColor hover:border-primary"
                >
                  Dark Circle Remove
                </button>
              </div>
              <button
                class="absolute top-0 bottom-0 left-[0px] bg-gray-200 hover:bg-gray-300 text-secondaryTxt font-bold py-2 px-4 rounded-full hover:shadow-md z-10"
              >
                &lt;</button
              ><button
                class="absolute top-0 bottom-0 right-[0px] bg-gray-200 hover:bg-gray-300 text-secondaryTxt font-bold py-2 px-4 rounded-full z-10 hover:shadow-md"
              >
                &gt;
              </button>
            </div>
            <div class="mt-[10px]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                <div
                  class="flex gap-[10px] justify-between items-start border border-borderColor rounded-[10px] py-[20px] px-[20px] lg:px-[40px] my-[10px] hover:bg-borderColor cursor-pointer"
                >
                  <div class="">
                    <h4 class="text-[16px] md:text-[20px] text-primaryTxt">
                      All Ages - Half Head Small Locs
                    </h4>
                    <p class="text-[14px] text-secondaryTxt">30min-2h</p>
                    <p class="text-[14px] text-secondaryTxt">
                      <b>Price: </b>170 $
                    </p>
                  </div>
                </div>
                <div
                  class="flex gap-[10px] justify-between items-start border border-borderColor rounded-[10px] py-[20px] px-[20px] lg:px-[40px] my-[10px] hover:bg-borderColor cursor-pointer"
                >
                  <div class="">
                    <h4 class="text-[16px] md:text-[20px] text-primaryTxt">
                      Child Haircut
                    </h4>
                    <p class="text-[14px] text-secondaryTxt">30min - 1h</p>
                    <p class="text-[14px] text-secondaryTxt">
                      <b>Price: </b>270 $
                    </p>
                  </div>
                </div>
                <div
                  class="flex gap-[10px] justify-between items-start border border-borderColor rounded-[10px] py-[20px] px-[20px] lg:px-[40px] my-[10px] hover:bg-borderColor cursor-pointer"
                >
                  <div class="">
                    <h4 class="text-[16px] md:text-[20px] text-primaryTxt">
                      Haircut - Beard
                    </h4>
                    <p class="text-[14px] text-secondaryTxt">30min - 1h</p>
                    <p class="text-[14px] text-secondaryTxt">
                      <b>Price: </b>370 $
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <section>
              <h4 class="text-[24px] md:text-[34px] pt-[40px] font-bold">
                Team
              </h4>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-[40px] mt-[20px]">
                <div class="">
                  <div class="flex justify-center">
                    <img
                      alt="img"
                      loading="lazy"
                      width="250"
                      height="250"
                      decoding="async"
                      data-nimg="1"
                      class="rounded-[12px] w-[140px] h-[140px]"
                      src="/assets/user.jpg"
                      style="color: transparent"
                    />
                  </div>
                  <p
                    class="text-primaryTxt text-center text-[18px] font-medium"
                  >
                    Jessy
                  </p>
                  <p class="text-secondaryTxt text-center text-[16px]">
                    Manager
                  </p>
                </div>
                <div class="">
                  <div class="flex justify-center">
                    <img
                      alt="img"
                      loading="lazy"
                      width="250"
                      height="250"
                      decoding="async"
                      data-nimg="1"
                      class="rounded-[12px] w-[140px] h-[140px]"
                      src="/assets/user.jpg"
                      style="color: transparent"
                    />
                  </div>
                  <p
                    class="text-primaryTxt text-center text-[18px] font-medium"
                  >
                    Jessy
                  </p>
                  <p class="text-secondaryTxt text-center text-[16px]">
                    Beauty Specialist
                  </p>
                </div>
                <div class="">
                  <div class="flex justify-center">
                    <img
                      alt="img"
                      loading="lazy"
                      width="250"
                      height="250"
                      decoding="async"
                      data-nimg="1"
                      class="rounded-[12px] w-[140px] h-[140px]"
                      src="/assets/user.jpg"
                      style="color: transparent"
                    />
                  </div>
                  <p
                    class="text-primaryTxt text-center text-[18px] font-medium"
                  >
                    Jessy
                  </p>
                  <p class="text-secondaryTxt text-center text-[16px]">
                    Therapist
                  </p>
                </div>
                <div class="">
                  <div class="flex justify-center">
                    <img
                      alt="img"
                      loading="lazy"
                      width="250"
                      height="250"
                      decoding="async"
                      data-nimg="1"
                      class="rounded-[12px] w-[140px] h-[140px]"
                      src="/assets/user.jpg"
                      style="color: transparent"
                    />
                  </div>
                  <p
                    class="text-primaryTxt text-center text-[18px] font-medium"
                  >
                    Jessy
                  </p>
                  <p class="text-secondaryTxt text-center text-[16px]">
                    Hair Cutter
                  </p>
                </div>
                <div class="">
                  <div class="flex justify-center">
                    <img
                      alt="img"
                      loading="lazy"
                      width="250"
                      height="250"
                      decoding="async"
                      data-nimg="1"
                      class="rounded-[12px] w-[140px] h-[140px]"
                      src="/assets/user.jpg"
                      style="color: transparent"
                    />
                  </div>
                  <p
                    class="text-primaryTxt text-center text-[18px] font-medium"
                  >
                    Jessy
                  </p>
                  <p class="text-secondaryTxt text-center text-[16px]">
                    Advicer
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h4 class="text-[24px] md:text-[34px] pt-[40px] font-bold">
                Reviews
              </h4>
              <div
                class="border border-borderColor py-[10px] px-[20px] flex flex-col lg:flex-row gap-[32px]"
              >
                <div
                  class="flex flex-col lg:flex-row gap-[20px] items-center min-w-[250px]"
                >
                  <img
                    alt=""
                    loading="lazy"
                    width="60"
                    height="60"
                    decoding="async"
                    data-nimg="1"
                    class="rounded-full"
                    src="/assets/provider.png"
                    style="color: transparent"
                  />
                  <div class="relative">
                    <p class="text-[16px] font-medium">Sensei Anna Hakkai</p>
                    <p class="text-[12px] text-secondaryTxt">
                      Apr 13, 2024, 6:51 PM
                    </p>
                    <div
                      class="absolute h-full bg-borderColor w-1 right-[-24px] top-[0px]"
                    ></div>
                  </div>
                </div>
                <div class="w-full flex flex-col justify-center">
                  <p class="text-[14px]"><strong>Rating: </strong> 5</p>
                  <p class="text-[14px]">
                    I got my nails done, the salon was very peaceful and a nice
                    environment
                  </p>
                </div>
              </div>
              <div
                class="border border-borderColor py-[10px] px-[20px] flex flex-col lg:flex-row gap-[32px]"
              >
                <div
                  class="flex flex-col lg:flex-row gap-[20px] items-center min-w-[250px]"
                >
                  <img
                    alt=""
                    loading="lazy"
                    width="60"
                    height="60"
                    decoding="async"
                    data-nimg="1"
                    class="rounded-full"
                    src="/assets/provider.png"
                    style="color: transparent"
                  />
                  <div class="relative">
                    <p class="text-[16px] font-medium">Sensei Anna Hakkai</p>
                    <p class="text-[12px] text-secondaryTxt">
                      Apr 13, 2024, 6:51 PM
                    </p>
                    <div
                      class="absolute h-full bg-borderColor w-1 right-[-24px] top-[0px]"
                    ></div>
                  </div>
                </div>
                <div class="w-full flex flex-col justify-center">
                  <p class="text-[14px]"><strong>Rating: </strong> 5</p>
                  <p class="text-[14px]">
                    I got my nails done, the salon was very peaceful and a nice
                    environment
                  </p>
                </div>
              </div>
              <button
                class="px-[20px] py-[12px] border border-borderColor mt-[10px] font-medium text-[16px] rounded-[5px] hover:bg-borderColor"
              >
                Load more
              </button>
            </section>
            <section>
              <h4 class="text-[24px] md:text-[34px] pt-[40px] font-bold">
                About
              </h4>
              <p class="text-[14px] font-normal text-justify mt-[10px]">
                ${shop?.about}
              </p>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.443468246039!2d2.352154115240311!3d48.85663867492449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1636709631242!5m2!1sen!2sfr"
                class="w-full h-[300px] my-[20px] rounded-md"
                loading="lazy"
              ></iframe>
            </section>
            <div class="p-[16px] bg-white">
              <h2 class="text-[24px] md:text-[34px] pt-[40px] font-bold mb-2">
                Opening Hours
              </h2>
              <ul>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Monday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Tuesday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Wednesday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Thursday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Friday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Saturday</span
                  ><span class="text-gray-700">9:00 AM - 6:00 PM</span>
                </li>
                <li class="flex justify-between py-1">
                  <span class="text-gray-700">Sunday</span
                  ><span class="text-gray-700">Closed</span>
                </li>
              </ul>
              <p class="mt-4">
                <span class="font-semibold">Today:</span> Monday, 9:00 AM - 6:00
                PM
              </p>
            </div>
          </div>

          <!-- <div
            class="lg:w-[40%] border border-borderColor p-[20px] rounded-[12px] sticky top-24 h-fit"
          >
            <h6
              class="text-[24px] md:text-[32px] lg:text-[44px] font-bold leading-[58px] break-words"
            >
              ${shop?.shopName}
            </h6>
            <div class="flex gap-[8px] text-[18px]">
              <p class="">5.0</p>
              <div class="flex mt-[5px] leading-[20px]">
                <div class="w-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                    ></path>
                  </svg>
                </div>
                <div class="w-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                    ></path>
                  </svg>
                </div>
                <div class="w-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                    ></path>
                  </svg>
                </div>
                <div class="w-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="m21.975 9.974-4.225 3.69 1.266 5.495a1.502 1.502 0 0 1-1.395 1.84 1.499 1.499 0 0 1-.839-.214l-4.788-2.907-4.778 2.907a1.499 1.499 0 0 1-2.234-1.626l1.264-5.489L2.02 9.974a1.5 1.5 0 0 1 .853-2.63l5.571-.484 2.175-5.19a1.495 1.495 0 0 1 2.758 0l2.18 5.19 5.57.483a1.498 1.498 0 0 1 1.318 1.899 1.5 1.5 0 0 1-.465.732h-.005Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-primary_dark">(1232)</p>
            </div>
            <div class="mt-[10px]">
              <h5 class="text-[20px] font-medium">Selected Service (0)</h5>
              <ul class="list-disc ml-[20px]"></ul>
            </div>
            <a href="/"
              ><button
                class="w-full bg-primary hover:bg-primary_dark rounded-[12px] py-[8px] text-white mt-[20px]"
              >
                Book Now
              </button></a
            >
            <div class="border-b-2 border-borderColor my-[20px]"></div>
            <div class="flex gap-[10px]">
              <div class="w-[20px] h-[20px] mt-[2px]">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Clock_2">
                    <g>
                      <path
                        d="M12,21.933A9.933,9.933,0,1,1,21.933,12,9.944,9.944,0,0,1,12,21.933ZM12,3.067A8.933,8.933,0,1,0,20.933,12,8.943,8.943,0,0,0,12,3.067Z"
                      ></path>
                      <path
                        d="M18,12.5H12a.429.429,0,0,1-.34-.14c-.01,0-.01-.01-.02-.02A.429.429,0,0,1,11.5,12V6a.5.5,0,0,1,1,0v5.5H18A.5.5,0,0,1,18,12.5Z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p class="">Open until 6:00 PM</p>
            </div>
            <div class="flex gap-[10px]">
              <div class="w-[20px] h-[20px] mt-[2px]">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                  ></path>
                  <circle
                    cx="256"
                    cy="192"
                    r="48"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  ></circle>
                </svg>
              </div>
              <p class="">${shop?.location}</p>
            </div>
          </div> -->

        </div>
      </section>
    </main>
  </body>
</html>
        `;

        const outputDir = path.join(
          process.cwd(),
          "src",
          "shops",
          `${label_id}`
        );
        const outputFile = path.join(outputDir, "index.html");

        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputFile, template);

        const live_url = `https://shop.randevual.co/${label_id}`;
        console.log("live", live_url);

        const whiteLabel = await whiteLabelModel.create({
          shopId,
          label_id,
          live_url,
          status: "no",
          businessId: userId
        });

        res.status(200).json({ success: true, whiteLabel });
      } catch (error) {
        console.error("Error adding customer and payment method:", error);
        res
          .status(500)
          .json({ error: "Unable to add customer and payment method" });
      }
    }
  }
);

export const findWhiteLabelingByShopController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const shopId = req.params.id;

    if (userId) {
      const whitelabel = await whiteLabelModel.findOne({ shopId: shopId });

      return res.status(200).json({
        success: true,
        msg: "WhiteLabeling has been retrived successfully.",
        whitelabel,
      });
    }
    return res.status(200).json({
      success: false,
      msg: "Something went wrong",
    });
  }
);
export const updateWhiteLabelingByShopController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const shopId = req.params.id;
    const data = req.body;

    console.log("body", data);

    if (userId) {
      const whitelabel = await whiteLabelModel.updateOne(
        { shopId: shopId },
        data,
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        msg: "WhiteLabeling status has been chnaged successfully.",
        whitelabel,
      });
    }
    return res.status(200).json({
      success: false,
      msg: "Something went wrong",
    });
  }
);

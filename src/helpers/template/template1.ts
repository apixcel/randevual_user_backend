import { ShopType } from "../../types/bookingType";

const template1 = (shopData: ShopType) => {
  const {
    shopName,
    media,
    about,
    categories,
    facebook,
    instagram,
    website,
    offHour,
    onHour,
    location,
    numOfratings,
    paymentMethod,
    ratings,
    services,
    weekEnd,
    weekStart,
    reviews,
    team,
  } = shopData;

  const template = `
  <!DOCTYPE html>
  <html lang="en" class="scroll-smooth">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      />
  
      <title>${shopName}</title>
  
      <style>
        .fontCustom {
          font-family: "Roboto", sans-serif;
        }
      </style>
    </head>
    <body class="fontCustom">
      <main id="home" class="bg-gray-200">
        <header
          class="sticky top-0 z-[999] bg-[#B3C8CF bg-white border-b border-gray-100 sticky:shadow-sm"
        >
          <div
            class="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center justify-between items-center gap-3 py-5 px-5"
          >
            <div class="text-lg font-medium">${shopName}</div>
            <ul class="flex items-center gap-5 text-lg font-medium">
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li>
              <li>
                <a href="#reviews">Review</a>
              </li>
            </ul>
          </div>
        </header>
  
        <!-- test banner  -->
        <section
          class="relative overflow-hidden min-h-96 md:h-[600px] bg-slate-800 text-white"
        >
          <video class="h-full w-full object-cover" autoplay muted loop>
            <source
              src="/img//mixkit-stylist-cutting-a-boys-hair-49339-medium.mp4"
              type="video/mp4"
            />
          </video>
          <div class="absolute inset-0 bg-black/50" />
          <div
            class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 flex flex-col justify-center items-center w-full h-full"
          >
            <h2 class="text-3xl md:text-5xl font-bold uppercase">Welcome to {{shop}}</h2>
            <p class="mt-10 text-center max-w-[800px] text-lg">
              ${about}
            </p>
          </div>
        </section>
  
        <!-- category  -->
        <section
          id="categories"
          class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 text-[#36454F]"
        >
          <h1 class="text-3xl font-bold mb-4">Categories</h1>
  
          <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          ${categories.map(
            (cat) =>
              `
              <li>
              <div
                class="flex justify-between items-center bg-[#F1EEDC] shadow-lg text-lg font-semibold p-5 rounded-md border"
              >
                ${cat.label}
              </div>
            </li>
              `
          )}
          </ul>
        </section>
        <!-- services  -->
        <section
          id="services"
          class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 text-[#36454F]"
        >
          <h1 class="text-3xl font-bold mb-4">Services</h1>
  
          <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          ${services.map(
            (service) =>
              `<li>
              <div class="bg-[#F1EEDC] p-5 rounded-md border shadow-md">
                <p class="text-lg font-semibold">${service.listName}</p>
                <ul class="list-disc ml-[15px]">
                ${service.list.map(
                  (item) =>
                    `
                    <li>${item?.name}</li>
                    `
                )}
                </ul>
              </div>
            </li>`
          )}
            
          </ul>
        </section>
        <!-- about us  -->
        <section class="min-h-96 md:h-[600px]">
          <div
            class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 flex items-center justify-center w-full h-full text-[#36454F]"
          >
            <div
              class="w-full h-full flex flex-col lg:flex-row gap-5 items-center"
            >
              <div class="flex-1">
                <h2 class="text-3xl font-bold uppercase">About Us</h2>
                <p class="mt-10 max-w-[600px] text-lg">
                  ${about}
                </p>
              </div>
              <div class="flex-1 h-[400px] bg-white rounded-lg overflow-hidden">
                <!-- {thumbnail} -->
                <img
                  src=${media?.thumbnail}
                  alt="Thumbnail"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- teams  -->
        <section
          id="team"
          class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 text-[#36454F]"
        >
          <h1 class="text-3xl font-bold mb-4">Team Members</h1>
  
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          ${team.map(
            (member) =>
              ` 
            <div class="bg-[#F1EEDC] shadow-md rounded-lg p-6 border">
              <div class="flex justify-center items-center relative">
                <img
                  class="w-[100px] h-[100px] bg-gray-200 rounded-full"
                  src=${member?.picture}
                  alt="team member"
                />
                <div
                  class="text-md text-gray-600 absolute bottom-[-10px] bg-[#BED7DC] px-[10px] border rounded flex items-center gap-[10px] w-fit"
                >
                  5.0
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill=""
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-star"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                </div>
              </div>
              <h3
                class="text-xl font-semibold text-[#36454F] mt-[10px] text-center"
              >
                ${member.name}
              </h3>
              <p class="text-gray-500 text-center">Hair Specialist</p>
            </div>
            `
          )}
          </div>
        </section>
  
        <section
          id="reviews"
          class="max-w-[1440px] mx-auto py-5 md:py-10 lg:py-20 px-5 text-[#36454F]"
        >
          <h1 class="text-3xl font-bold mb-4">Our Clients Say</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div class="max-w-4xl bg-[#E5DDC5] text- rounded-md p-7 relative">
              <div class="flex flex-col items-center gap-3 text-[#36454F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  viewBox="0 0 298.667 298.667"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                  class=""
                >
                  <g>
                    <path
                      d="M0 170.667h64L21.333 256h64L128 170.667v-128H0zM170.667 42.667v128h64L192 256h64l42.667-85.333v-128z"
                      fill="#fff"
                      opacity="1"
                      data-original="#fff"
                      class=""
                    ></path>
                  </g>
                </svg>
                <p class="text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quaerat eveniet sequi at, cumque cupiditate beatae qui
                  consequatur assumenda nesciunt voluptatum, quis modi est earum
                  voluptatibus.
                </p>
                <div class="flex justify-center gap-3 items-center mt-5">
                  <img
                    src="https://i.ibb.co/RCwbvJ7/ig10.jpg"
                    alt="Commenter"
                    class="h-[50px] w-[50px] object-cover rounded-full"
                  />
                  <div>
                    <h3 class="font-bold text-2xl">Jenny Marlin</h3>
                    <!-- <h5 class="">Beauty Artist</h5> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="max-w-4xl bg-[#E5DDC5] text- rounded-md p-7 relative">
              <div class="flex flex-col items-center gap-3 text-[#36454F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  viewBox="0 0 298.667 298.667"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                  class=""
                >
                  <g>
                    <path
                      d="M0 170.667h64L21.333 256h64L128 170.667v-128H0zM170.667 42.667v128h64L192 256h64l42.667-85.333v-128z"
                      fill="#fff"
                      opacity="1"
                      data-original="#fff"
                      class=""
                    ></path>
                  </g>
                </svg>
                <p class="text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quaerat eveniet sequi at, cumque cupiditate beatae qui
                  consequatur assumenda nesciunt voluptatum, quis modi est earum
                  voluptatibus.
                </p>
                <div class="flex justify-center gap-3 items-center mt-5">
                  <img
                    src="https://i.ibb.co/RCwbvJ7/ig10.jpg}
                    alt="Commenter"
                    class="h-[50px] w-[50px] object-cover rounded-full"
                  />
                  <div>
                    <h3 class="font-bold text-2xl">Jenny Marlin</h3>
                    <!-- <h5 class="">Beauty Artist</h5> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <footer class="bg-gray-300 text-black px-10 pt-24 pb-12">
          <div
            class="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-20 px-5"
          >
            <div>
              <h1 class="text-2xl font-bold uppercase mb-5">Contact Us</h1>
              <p class="max-w-80">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut eum
                consequuntur ea hic iusto, earum quidem quasi sequi fugiat
                voluptatibus!
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-5">Office Location</h3>
              <p>{{location}}</p>
              <p>Open: {{open time}}</p>
              <p>Close: {{location}}</p>
            </div>
            <div class="links">
              <h3 class="text-xl font-semibold mb-5">Stay connected with:</h3>
              <ul class="flex items-center gap-7">
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="24"
                      height="24"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                      class=""
                    >
                      <g>
                        <path
                          d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256s114.6 256 256 256c1.5 0 3 0 4.5-.1V312.7h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5C433.7 471.4 512 372.9 512 256z"
                          fill="#000"
                          opacity="1"
                          data-original="#ffffff"
                          class=""
                        ></path>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="24"
                      height="24"
                      x="0"
                      y="0"
                      viewBox="0 0 512.001 512.001"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                      class=""
                    >
                      <g>
                        <path
                          d="M373.406 0H138.594C62.172 0 0 62.172 0 138.594V373.41C0 449.828 62.172 512 138.594 512H373.41C449.828 512 512 449.828 512 373.41V138.594C512 62.172 449.828 0 373.406 0zm108.578 373.41c0 59.867-48.707 108.574-108.578 108.574H138.594c-59.871 0-108.578-48.707-108.578-108.574V138.594c0-59.871 48.707-108.578 108.578-108.578H373.41c59.867 0 108.574 48.707 108.574 108.578zm0 0"
                          fill="#000"
                          opacity="1"
                          data-original="#ffffff"
                          class=""
                        ></path>
                        <path
                          d="M256 116.004c-77.195 0-139.996 62.8-139.996 139.996S178.804 395.996 256 395.996 395.996 333.196 395.996 256 333.196 116.004 256 116.004zm0 249.976c-60.64 0-109.98-49.335-109.98-109.98 0-60.64 49.34-109.98 109.98-109.98 60.645 0 109.98 49.34 109.98 109.98 0 60.645-49.335 109.98-109.98 109.98zM399.344 66.285c-22.813 0-41.367 18.559-41.367 41.367 0 22.813 18.554 41.371 41.367 41.371s41.37-18.558 41.37-41.37-18.558-41.368-41.37-41.368zm0 52.719c-6.258 0-11.352-5.094-11.352-11.352 0-6.261 5.094-11.351 11.352-11.351 6.261 0 11.355 5.09 11.355 11.351 0 6.258-5.094 11.352-11.355 11.352zm0 0"
                          fill="#000"
                          opacity="1"
                          data-original="#ffffff"
                          class=""
                        ></path>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="24"
                      height="24"
                      x="0"
                      y="0"
                      viewBox="0 0 511.999 511.999"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                      class=""
                    >
                      <g>
                        <path
                          d="M437.019 74.981C388.667 26.628 324.38 0 256 0 187.62 0 123.332 26.628 74.981 74.98 26.628 123.332 0 187.62 0 256s26.628 132.667 74.981 181.019c48.351 48.352 112.639 74.98 181.019 74.98 68.381 0 132.667-26.628 181.02-74.981C485.371 388.667 512 324.379 512 255.999s-26.629-132.667-74.981-181.018zM96.216 96.216c22.511-22.511 48.938-39.681 77.742-50.888-7.672 9.578-14.851 20.587-21.43 32.969-7.641 14.38-14.234 30.173-19.725 47.042-19.022-3.157-36.647-7.039-52.393-11.595a230.423 230.423 0 0 1 15.806-17.528zm-33.987 43.369c18.417 5.897 39.479 10.87 62.461 14.809-6.4 27.166-10.167 56.399-11.066 86.591H30.536c2.36-36.233 13.242-70.813 31.693-101.4zm-1.635 230.053c-17.455-29.899-27.769-63.481-30.059-98.623h83.146c.982 29.329 4.674 57.731 10.858 84.186-23.454 3.802-45.045 8.649-63.945 14.437zm35.622 46.146a229.917 229.917 0 0 1-17.831-20.055c16.323-4.526 34.571-8.359 54.214-11.433 5.53 17.103 12.194 33.105 19.928 47.662 7.17 13.493 15.053 25.349 23.51 35.505-29.61-11.183-56.769-28.629-79.821-51.679zm144.768 62.331c-22.808-6.389-44.384-27.217-61.936-60.249-6.139-11.552-11.531-24.155-16.15-37.587 24.73-2.722 51.045-4.331 78.086-4.709v102.545zm0-132.578c-29.988.409-59.217 2.292-86.59 5.507-6.038-24.961-9.671-51.978-10.668-80.028h97.259v74.521zm0-104.553h-97.315c.911-28.834 4.602-56.605 10.828-82.201 27.198 3.4 56.366 5.468 86.487 6.06v76.141zm0-106.176c-27.146-.547-53.403-2.317-77.958-5.205 4.591-13.292 9.941-25.768 16.022-37.215 17.551-33.032 39.128-53.86 61.936-60.249v102.669zm209.733 6.372c17.874 30.193 28.427 64.199 30.749 99.804h-83.088c-.889-29.844-4.584-58.749-10.85-85.647 23.133-3.736 44.456-8.489 63.189-14.157zm-34.934-44.964a230.122 230.122 0 0 1 16.914 18.91c-16.073 4.389-33.972 8.114-53.204 11.112-5.548-17.208-12.243-33.305-20.02-47.941-6.579-12.382-13.758-23.391-21.43-32.969 28.802 11.207 55.23 28.377 77.74 50.888zm-144.767 174.8h97.259c-1.004 28.268-4.686 55.49-10.81 80.612-27.194-3.381-56.349-5.43-86.449-6.006v-74.606zm0-30.032v-76.041c30.005-.394 59.257-2.261 86.656-5.464 6.125 25.403 9.756 52.932 10.659 81.505h-97.315zm-.002-208.845h.001c22.808 6.389 44.384 27.217 61.936 60.249 6.178 11.627 11.601 24.318 16.24 37.848-24.763 2.712-51.108 4.309-78.177 4.674V32.139zm.002 445.976V375.657c27.12.532 53.357 2.286 77.903 5.156-4.579 13.232-9.911 25.654-15.967 37.053-17.552 33.032-39.128 53.86-61.936 60.249zm144.767-62.331c-23.051 23.051-50.21 40.496-79.821 51.678 8.457-10.156 16.34-22.011 23.51-35.504 7.62-14.341 14.198-30.088 19.68-46.906 19.465 3.213 37.473 7.186 53.515 11.859a230.268 230.268 0 0 1-16.884 18.873zm34.823-44.775c-18.635-5.991-40-11.032-63.326-15.01 6.296-26.68 10.048-55.36 11.041-84.983h83.146c-2.328 35.678-12.918 69.753-30.861 99.993z"
                          fill="#000"
                          opacity="1"
                          data-original="#ffffff"
                          class=""
                        ></path>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <span class="text-lg text-gray-600 mt-[40px] text-center block"
            >©<a href="https://test.io/">${shopName}</a> 2024, All rights
            reserved.</span
          >
        </footer>
      </main>
    </body>
  </html>
  
    `;

    return template
};

export default template1;

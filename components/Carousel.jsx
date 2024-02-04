import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/modules'
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import { PlayIcon } from '@heroicons/react/24/solid'

const Carousel = ({tv, getGenreById}) => {
  return (
   <div>
   <Swiper
     slidesPerView={1}
     spaceBetween={30}
     loop={true}
     pagination={{
       clickable: true,
     }}
     navigation={true}
     modules={[Pagination, Navigation]}
     className="mySwiper w-full h-[32rem] rounded-xl"
   >
     {tv && tv.items.map((movie, index) => (
       <SwiperSlide className='slides w-full relative' key={index}>
         <Image alt='backdrop' fill className="object-cover z-10" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
         <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
         <div className="absolute z-30 w-full h-full flex flex-col justify-center px-16">
           <h3 className="text-4xl text-white font-bold">{movie.name}</h3>
           <div className="flex gap-6">
             <p className=" text-gray-200 text-lg font-bold my-4">{new Date(movie.first_air_date).getFullYear()}</p>
             <p className=" text-white text-sm font-bold my-4 px-2 py-1 rounded-sm bg-[#313036e7] bg-opacity-85">{(movie.vote_average).toFixed(1)}</p>
           </div>
           <div className="mb-3">
             {movie.genre_ids.map((genre, index) => (
               <span className="mx-1 font-semibold text-white" key={index}>{getGenreById(genre)}</span>
             ))}
           </div>
           <div className="w-2/4">
             {movie.overview.slice(0, 200)}...
           </div>
           <div className="my-7 flex gap-3 w-40 rounded-md bg-red-700 hover:bg-red-800 px-4 py-2">
             <PlayIcon width={20} />
             <button className=" font-medium">Watch Now</button>
           </div>
         </div>
       </SwiperSlide>
     ))}
   </Swiper>
 </div>
  )
}

export default Carousel
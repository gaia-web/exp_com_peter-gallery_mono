import './home.css'

export function HomePage() {
  // const transition = "transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300";
  const clicked = () => {
    console.log("clicked")
  }


  return (
    <div>
      <div class="scaleDown h-85vh text-center">
        <div class="fade-in-5s transition m-auto h-6rem top-35% relative flex justify-center items-end text-7xl">
          那颗我们所钟爱的
        </div>
        <div class="fade-in-6s transition m-auto h-6rem top-36% relative text-7xl">
          蔚蓝星球
        </div>
        <div class="slideDown bg-#0042ED m-auto w-14rem h-0.2rem rounded-full relative top-36%">
        </div>
        <div class="slideDown p-2rem relative top-36%">
          以及，在她之上生生不息的我们
        </div>
      </div>
      <div class="absolute bottom-10% left-10% ">
        <div class="relative text-4xl">
          那颗我们所钟爱的
        </div>
        <div class="relative text-4xl">
          蔚蓝星球
        </div>
        <div class="bg-#0042ED mt-1rem mb-2rem w-14rem h-0.2rem rounded-full relative "></div>
        <div class="relative text-base">
          以及，在她之上生生不息的我们
        </div>
      </div>

      <div class="opacity-20 hover:opacity-100 bg-green w-80vw h-80vh absolute bottom-0 right-0 mb-2rem br-2rem flex justify-between" onClick={clicked}>
        <div class="bg-gradient-to-r w-30% from-purple-500 hover:from-purple-500 to-pink-500 hover:to-purple-500 text-5xl hover:text-7xl hover:transition-all hover:duration-5000">
          <div class="transform rotate-90 origin-top-left top-5% left-25% relative w-40vh">WORLD 世界</div>
        </div>
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-30% text-5xl">
          <div class="transform rotate-90 origin-top-left top-5% left-25% relative">WORLD 世界</div>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-black-500 bg-blue w-30% text-5xl">
          <div class="transform rotate-90 origin-top-left top-5% left-25% relative">WORLD 世界</div>
        </div>
      </div>
    </div>
  );
}

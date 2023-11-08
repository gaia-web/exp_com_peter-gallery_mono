import './home.css'

export function HomePage() {

  return (
    <div>
      <div class="threePics bottom-10 right-10">
        <div class="parent text-5xl">
          <img src="/public/world.png"></img>
          <div >WORLD 世界</div>
        </div>
        <div class="parent text-5xl">
          <img src="/public/people.png"></img>
          <div >PEOPLE 众生</div>
        </div>
        <div class="parent text-5xl">
          <img src="/public/selves.png"></img>
          <div >SELVES 我们</div>
        </div>
      </div>

      <div class="scaleDown h-85vh text-center slogan">
        <div class="fade-in-5s m-auto h-6rem relative flex justify-center items-end text-7xl">
          那颗我们所钟爱的
        </div>
        <div class="fade-in-6s m-auto pt-0.5rem h-6rem text-7xl">
          蔚蓝星球
        </div>
         <div class="line bg-#0042ED m-auto h-0.2rem rounded-full"/>
        <div class="slideDown pt-2rem text-2xl">
            以及，在她之上生生不息的我们
        </div>
      </div>
    </div>
  );
}

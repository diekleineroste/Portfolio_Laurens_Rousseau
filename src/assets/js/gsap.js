import "../styles/style.scss"
import gsap from "gsap"

const skills = document.querySelectorAll(".skills")

skills.forEach(function (e) {
  let skillsWidth = e.getBoundingClientRect().width
  for (let i = 0; i < e.children.length; i++) {
    skillsWidth += e.children[i].getBoundingClientRect().width
  }

  const start = 0
  gsap.set(e, {
    xPercent: `${start}`,
  })

  var tl = gsap.timeline()
  tl.to(e, {
    ease: "none",
    duration: skillsWidth / 100,
    xPercent: ((skillsWidth * 0.505) / skillsWidth) * 100 * -1,
    repeat: -1,
  })
})

const first = gsap.timeline({
  defauls: {
    ease: "expo.out",
  },
})
const second = gsap.timeline({
  defauls: {
    ease: "expo.out",
  },
})
const third = gsap.timeline({
  defauls: {
    ease: "expo.out",
  },
})
const fourth = gsap.timeline({
  defauls: {
    ease: "expo.out",
  },
})

document.querySelector("#first").addEventListener("mouseenter", () => {
  first.to("#first-overlay", {
    left: "0%",
    width: "100%",
    duration: 0.5,
  })
  first.play()
})
document.querySelector("#first").addEventListener("mouseleave", () => {
  first.reverse()
})

document.querySelector("#second").addEventListener("mouseenter", () => {
  second.to("#second-overlay", {
    left: "0%",
    width: "100%",
    duration: 0.5,
  })
  second.play()
})
document.querySelector("#second").addEventListener("mouseleave", () => {
  second.reverse()
})

document.querySelector("#third").addEventListener("mouseenter", () => {
  third.to("#third-overlay", {
    left: "0%",
    width: "100%",
    duration: 0.5,
  })
  third.play()
})
document.querySelector("#third").addEventListener("mouseleave", () => {
  third.reverse()
})

if (document.querySelector("#fourth")) {
  document.querySelector("#fourth").addEventListener("mouseenter", () => {
    fourth.to("#fourth-overlay", {
      left: "0%",
      width: "100%",
      duration: 0.5,
    })
    fourth.play()
  })
  document.querySelector("#fourth").addEventListener("mouseleave", () => {
    fourth.reverse()
  })
}

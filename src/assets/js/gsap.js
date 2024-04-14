import "../styles/style.scss"
import gsap from "gsap"

const skills = document.querySelectorAll(".skills")

skills.forEach(function (e) {
	let skillsWidth = e.getBoundingClientRect().width
    for (let i = 0; i < e.children.length; i++) {
        skillsWidth += e.children[i].getBoundingClientRect().width
    }

	const start = ((skillsWidth *.505) / skillsWidth) * 100 * -1
	gsap.set(e, {
		xPercent: `${start}`
	})

	var tl = gsap.timeline()
	tl.to(e, {
		ease: "none",
		duration: skillsWidth / 100,
		xPercent: 0,
		repeat: -1
	})
})
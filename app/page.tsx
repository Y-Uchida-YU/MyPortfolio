import Link from "next/link";

const works = [
  { href: "/goods", no: "01", tag: "EC / REUSE", title: "OTAKARA LOOP", desc: "コレクターズグッズの買取・販売モック", tone: "coral" },
  { href: "/jobs", no: "02", tag: "RECRUIT", title: "BUILD SHIFT", desc: "建設業界のキャリア・求人サイト", tone: "blue" },
  { href: "/tech", no: "03", tag: "BLOCKCHAIN", title: "NULL / PROTOCOL", desc: "Web3開発企業の没入型コーポレートサイト", tone: "violet" },
];

export default function Home() {
  return <main className="portfolio">
    <nav className="p-nav"><Link href="/" className="p-logo">YU<span>.</span></Link><div><a href="#works">WORKS</a><a href="#about">ABOUT</a></div></nav>
    <section className="p-hero">
      <div className="p-eyebrow"><i /> WEB DESIGN &amp; DEVELOPMENT · TOKYO</div>
      <h1>Designing<br/><em>useful</em> moments.</h1>
      <div className="p-intro"><p>伝えたい価値を、迷わず届く体験へ。<br/>企画からデザイン、実装まで一貫してつくります。</p><a href="#works" aria-label="制作事例へ" className="round-arrow">↘</a></div>
    </section>
    <section className="p-works" id="works">
      <div className="section-title"><span>SELECTED WORKS</span><span>2026 / 03 PROJECTS</span></div>
      {works.map((work) => <Link href={work.href} className={`work-row ${work.tone}`} key={work.href}>
        <span className="work-no">{work.no}</span><span className="work-tag">{work.tag}</span>
        <div><h2>{work.title}</h2><p>{work.desc}</p></div><span className="work-open">VIEW ↗</span>
      </Link>)}
    </section>
    <section className="p-about" id="about">
      <div className="portrait"><span>YU</span><div className="orbit">CREATIVE<br/>DEVELOPER</div></div>
      <div><span className="mini-label">ABOUT ME</span><h2>内田 悠太 <small>YUTA UCHIDA</small></h2><p>Webサイトの設計とフロントエンド実装を中心に活動しています。業界ごとの空気感を捉え、情報を整理し、見る人が自然に次の一歩へ進めるサイトづくりが得意です。</p><div className="skills"><span>UI / UX DESIGN</span><span>FRONTEND</span><span>INTERACTION</span><span>BRANDING</span></div></div>
    </section>
    <footer className="p-footer"><p>LET&apos;S MAKE SOMETHING<br/><em>MEMORABLE.</em></p><span>PORTFOLIO © 2026</span></footer>
  </main>;
}

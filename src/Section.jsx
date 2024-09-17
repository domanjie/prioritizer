const Section = ({ className, TitleIco, title, children }) => {
  return (
    <section className={`${className}  section`}>
      <div className="section-title">
        <>{TitleIco}</> <p className="sub-font">{title}</p>
      </div>
      {children}
    </section>
  )
}
export default Section

const { defaultPort } = process.env;

const HomePage = () => {
  console.log("PAGE ENV", defaultPort)
  return (
    <>
      <div className=''>HomePage</div>
    </>
  )
}

export default HomePage
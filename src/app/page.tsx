import { readMusic } from "@/utils/music/read";

const DashboardPage = () => {
  readMusic();
  return (
    <>
      <div className=''>Dashboard</div>
    </>
  )
}

export default DashboardPage
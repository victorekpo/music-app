'use client'

const myVic = process.env.NEXT_PUBLIC_VICTOR;
const myVic2 = process.env.NEXT_PUBLIC_MYVAR;
const myVic3 = process.env.NEXT_PUBLIC_dataSet;

const ListPage = () => {
  console.log('list page', myVic, myVic2, myVic3)
  return (
    <div className=''>ListPage</div>
  )
}

export default ListPage;
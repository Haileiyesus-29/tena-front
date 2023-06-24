import Pagination from '../layout/Pagination'
import Post from '../layout/Post'
import SearchBox from '../layout/SearchBox'

const HomePage = () => {
   return (
      <>
         <div className='pt-[4rem] px-[15%] min-h-screen bg-slate-50 my-8'>
            <SearchBox />
            <div className='flex flex-col items-center gap-3'>
               <Post />
               <Post />
               <Post />
               <Post />
               <Pagination />
            </div>
         </div>
      </>
   )
}

export default HomePage

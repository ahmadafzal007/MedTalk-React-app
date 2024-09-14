import { SearchIcon } from 'lucide-react'

const SearchBar = ({ isExpanded, searchQuery, setSearchQuery }) => {
  return (
    <div
      className={`mt-3 bg-black inline-flex h-11 items-center gap-2 rounded-full p-3 text-sm text-white font-semibold transition-all ease-in-out transform ${
        isExpanded ? 'w-[9rem]' : 'w-11'
      } hover:scale-105 shadow-lg`}
      style={{
        transitionDuration: '400ms',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
      }}
    >
      <SearchIcon size={20} />
      <input
        type='text'
        placeholder='Search...'
        className={`bg-transparent text-white font-thin outline-none w-full transition-opacity duration-300 ${
          !isExpanded ? 'opacity-0 w-0' : 'opacity-100 w-full'
        }`}
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        value={searchQuery}
      />
    </div>
  )
}

export default SearchBar

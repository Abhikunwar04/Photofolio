import { motion } from 'framer-motion'

interface Category {
  _id: string
  name: string
  slug: string
  icon: string
  color: string
  coverImage: string
}

interface Props {
  categories: Category[]
  selected: string | null
  onSelect: (id: string | null) => void
}

const CategoryCluster = ({ categories, selected, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      
      {/* All button */}
      <motion.button
        onClick={() => onSelect(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`px-6 py-3 rounded-full text-sm tracking-widest uppercase border transition-all duration-300 ${
          selected === null
            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30'
            : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
        }`}
      >
        All
      </motion.button>

      {categories.map((cat, index) => (
        <motion.button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`px-6 py-3 rounded-full text-sm tracking-widest uppercase border transition-all duration-300 flex items-center gap-2 ${
            selected === cat._id
              ? 'text-white shadow-lg'
              : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
          }`}
          style={
            selected === cat._id
              ? { backgroundColor: cat.color, borderColor: cat.color, boxShadow: `0 0 20px ${cat.color}50` }
              : {}
          }
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default CategoryCluster
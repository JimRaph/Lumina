import PropTypes from 'prop-types';
const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-gray-300 text-3xl sm:text-4xl font-light'>{text1} 
            <span className='accent-text font-bold'>  {text2}</span>
        </p>
        <p className='w-8 sm:w-12 h-[2px] bg-emerald-400'></p>
    </div>
  )
}
Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default Title

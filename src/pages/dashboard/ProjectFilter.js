import React from 'react';

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = ({ currentFilter, changeFilter }) => {
    // const [currentFilter, setCurrentFilter] = useState('all');

    const handleClick = (newFilter) => {
        // console.log(newFilter);
        // setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }
    
    return (
        <div className='project-filter'>
            <nav>
                <p>Filter by :</p>
                {filterList.map(filter => (
                    <button 
                        key={filter} 
                        onClick={() => handleClick(filter)}
                        className={currentFilter === filter ? 'active' : ''}
                    >
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;

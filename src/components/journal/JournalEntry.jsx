export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">

      <div 
         className="journal__entry-picture"
         style={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRooEkgUSA8K9EFYl5j7SbTmV_78crkCpZA&usqp=CAU)',
            backgroundRepeat: 'no-repeat'
         }}
      >
      </div>

      <div className="journal__entry-body">
         <p className="journal__entry-title mt-1">
            A new day for Osito 
         </p>
         <p className="journal__entry-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
         </p>
      </div>

      <div className="journal__entry-date">
         <span>Monday</span>
         <h4>28</h4>
      </div>

    </div>
  )
}
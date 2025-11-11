import { useState } from 'react';
import { BookOfLifeDB } from '../assets/BookOfLifeDB'; // Import the pseudo database

function BookOfLife() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Transform the BookOfLifeDB object into an array for easier mapping
  const iconsData = Object.values(BookOfLifeDB).filter(person => person.xclusive);
  const regularCasketsData = Object.values(BookOfLifeDB).filter(person => !person.xclusive);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const handleClosePopup = () => {
    setSelectedPerson(null);
  };

  const handleBackdropClick = (e) => {
    // Close the popup only if the click happens on the backdrop (not inside the modal)
    if (e.target.id === 'backdrop') {
      handleClosePopup();
    }
  };

  return (
    <div>

      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        {/* Icons Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Legends</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {iconsData.map((person) => (
              <div
                key={person.id}
                className="border-4 border-gold p-4 rounded-lg cursor-pointer"
                onClick={() => handlePersonClick(person)}
              >
                <img src={person.imageUrl} alt={person.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p>{person.birthYear} - {person.deathYear}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Regular Caskets Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Icons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularCasketsData.map((person) => (
              <div
                key={person.id}
                className="border-2 border-gray-300 p-4 rounded-lg cursor-pointer"
                onClick={() => handlePersonClick(person)}
              >
                <img src={person.imageUrl} alt={person.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p>{person.birthYear} - {person.deathYear}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Popup for biography */}
      {selectedPerson && (
        <div
          id="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
            <button onClick={handleClosePopup} className="absolute top-2 right-4 text-gray-600 text-2xl">&times;</button>
            <h3 className="text-2xl font-bold mb-4">{selectedPerson.name}</h3>
            <p>{selectedPerson.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookOfLife;

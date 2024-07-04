import React from 'react';

const team = [
  {
    name: 'Ricardo Nery Dosko',
    role: 'Dev Frontend',
    linkedin: 'https://www.linkedin.com/in/ricardo-dosko/',
    github: 'https://github.com/RicardoDosko'
  },
  {
    name: 'Vanina Zampini',
    role: 'Dev Frontend',
    linkedin: 'https://www.linkedin.com/in/vanina-zampini-78627a283/',
    github: 'https://github.com/vaninazampini23'
  },
  {
    name: 'Fernando Francisco Agustín Pérez',
    role: 'Dev Frontend',
    linkedin: 'https://www.linkedin.com/in/agusfdez/',
    github: 'https://github.com/SalteFdez'
  },
  {
    name: 'Facundo Sura',
    role: 'Dev Backend',
    linkedin: 'https://www.linkedin.com/in/facundo-martin-emiliano-s-974b74253/',
    github: 'https://github.com/Facundo-Sura'
  },
  {
    name: 'David Palomino',
    role: 'Dev Backend',
    linkedin: 'https://www.linkedin.com/in/david-palomino-256013295/',
    github: 'https://github.com/DavidPalomino'
  },
  {
    name: 'Alejandro Serrano Herrera',
    role: 'Dev Backend',
    linkedin: 'https://www.linkedin.com/in/serranoh93/',
    github: 'https://github.com/SerranoH93'
  }
];

const Contacto = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-4xl mb-10">Página de Contacto</h1>
      <h2 className="text-2xl mb-6">Nuestro equipo</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Rol</th>
              <th className="px-6 py-3 text-left">Redes Sociales</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2"
                  >
                    <img
                      src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"
                      alt="LinkedIn"
                      className="inline-block"
                    />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
                      alt="GitHub"
                      className="inline-block"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacto;

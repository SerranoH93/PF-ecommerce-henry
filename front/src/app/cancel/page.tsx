import Link from 'next/link';

const Cancel = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800 text-center p-6">
            <h1 className="text-4xl mb-6">Compra Cancelada</h1>
            <p className="text-lg mb-8">Lamentamos que hayas cancelado tu compra. Si necesitas ayuda, por favor contáctanos.</p>
                <a href='/' className="bg-red-200 text-red-800 px-6 py-3 rounded-lg text-lg transition-colors duration-300 hover:bg-red-300">
                    Ver más productos
                </a>
        </div>
    );
};

export default Cancel;

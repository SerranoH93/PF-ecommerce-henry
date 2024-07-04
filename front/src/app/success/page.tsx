import Link from 'next/link';

const Success = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-green-800 text-center p-6">
            <h1 className="text-4xl mb-6">Compra Exitosa</h1>
            <p className="text-lg mb-8">¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.</p>
                <a href='/' className="bg-green-200 text-green-800 px-6 py-3 rounded-lg text-lg transition-colors duration-300 hover:bg-green-300">
                    Hacer más compras
                </a>
        </div>
    );
};

export default Success;

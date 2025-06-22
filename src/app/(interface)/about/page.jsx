// pages/about.js
import Head from 'next/head';

const About = () => {
    return (
        <div className="pt-16 md:pt-24">
            <Head>
                <title>About Us - Valmo</title>
                <meta name="description" content="About Valmo - India's most reliable and lowest cost logistics service partner." />
            </Head>

            <div className=" h-64 min-h-fit p-8 md:px-24 bg-cover bg-center bg-[rgba(0, 0, 0, .45)] bg-[url('/valmo_warehouse.jpg')]">
                <strong className='text-white text-[28px]  md:text-[42px] mt-4'>We are Valmo<br />
                    India’s most reliable and lowest cost logistics service partner
                </strong>
            </div>

            <div className='bg-green-900 text-white text-[18px] md:text-[24px] font-sans leading-8 p-8 md:px-24'>
                <p>Our aim is to streamline the logistics process - offering a smooth and efficient delivery experience, all while delivering excellent value by offering the lowest cost.</p>
                <p className='mt-4'>Our commitment to achieving this goal is encapsulated in our very name—Valmo—a delightful combination of "Movement” driven by “Value.” The name encapsulates our core principle of facilitating value-for-money logistics, and our dedication to provide high quality service.</p>
            </div>

            <div className='p-8 md:px-24'>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
                <p className="text-lg mb-4">
                    To deliver India’s most reliable and lowest cost supply chain logistics.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Our Vision</h2>
                <p className="text-lg mb-4">
                    To create a future where logistics is effortless, reliable, offered at the best value, and accessible to all. Thus, allowing small and large businesses to focus on their business goals, while we handle the rest.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Who Are We Serving?</h2>
                <p className="text-lg mb-4">
                    Currently our customers consist of all sellers on the Meesho platform, spanning both well-established enterprises as well as dynamic small brands.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Valmo Airhub</h2>
                <p className="text-lg mb-4">
                    All our first mile and last mile nodes will now be referred to as a “Valmo Airhub”. These are the seller/customer facing nodes in our operations.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Valmo Captains</h2>
                <p className="text-lg mb-4">
                    The partners who own these Airhubs will be known as Captains. These are people who own the first/last mile hubs and are responsible for all operations happening in these hubs.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Valmo Pilots</h2>
                <p className="text-lg mb-4">
                    Each first and last mile node will have pickup/delivery executives who interact with our sellers/customers on a day-to-day basis. These people will be known as Valmo Pilots, who will be responsible for ensuring secure and timely pickup or delivery of the shipments.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Valmo Base</h2>
                <p className="text-lg mb-4">
                    All the middle nodes in our operations, including sort centres and cross docks, will be known as Valmo Base. These nodes will be critical in handling large scale operations efficiently and providing the right direction to our shipments.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Valmo Handlers</h2>
                <p className="text-lg mb-4">
                    Given the large number of shipments being handled by people working in sort centres/cross docks, these sorting specialists will be known as Valmo Handlers.
                </p>

            </div>
        </div>
    );
};

export default About;

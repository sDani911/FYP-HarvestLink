import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from '../../axiosConfig';

function MarketPlace() {
    const [marketPlaceData, setMarketPlaceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/MarketplaceCropData?page=${currentPage}&view=${itemsPerPage}`);
                const { data, last_page } = response.data;
                setMarketPlaceData(data.data);
                setTotalPages(last_page);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="border border-solid black bg-blue-200 m-10 p-10">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && marketPlaceData.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        productName={item.name}
                        price={item.selling_price}
                        quantity={item.quantity+ ' ' +item.unit}
                        description={item.description}
                        location={item.farm.address.city}
                        imageUrl={item.image_url}
                    />
                ))}
            </div>
        </div>
    );
}

export default MarketPlace;

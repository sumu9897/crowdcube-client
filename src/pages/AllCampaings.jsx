import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CampaignCard from '../components/CampaignCard';

function AllCampaings() {
    const campaigns = useLoaderData();
    return (
        <div>
            AllCampaing Page {campaigns.length}
            <h1>
                {
                    campaigns.map(campaign => <CampaignCard key={campaign._id} campaign={campaign}/>)
                }
            </h1>
        </div>
    )
}

export default AllCampaings

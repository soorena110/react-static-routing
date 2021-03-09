import React from "react";

interface Props {
    color?: string;
}

export default function PageLoading({color}: Props) {
    return <div style={{color}}>loading !!!!</div>
}

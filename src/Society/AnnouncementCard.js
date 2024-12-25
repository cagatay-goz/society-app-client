import React from "react";
import { Card, Typography, Image } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./AnnouncementCard.css";

const { Title, Text, Paragraph } = Typography;

function AnnouncementCard({ title, content, date, location, poster_url }) {
    return (
        <Card
            hoverable
            style={{ width: 300, margin: "10px" }}
            cover={
                poster_url && (
                    <Image
                        src={poster_url}
                        alt={title}
                        preview={false}
                        style={{ height: 150, objectFit: "cover" }}
                    />
                )
            }
        >
            <Title level={4} style={{ marginBottom: "10px" }}>
                {title}
            </Title>
            <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                {content}
            </Paragraph>
            <Text>
                <CalendarOutlined style={{ marginRight: 8 }} />
                {date ? new Date(date).toLocaleDateString() : "No date provided"}
            </Text>
            <br />
            <Text>
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                {location || "No location provided"}
            </Text>
        </Card>
    );
}

export default AnnouncementCard;

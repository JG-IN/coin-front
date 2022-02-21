import axios from "axios"
import React, { useEffect, useState, useRef } from "react";
import { Card, CardTitle, CardText, CardHeader, CardFooter, CardLink, Col } from "reactstrap"

const Tweet = ({ticker}) => {
    const [tweet, setTweet] = useState([{}])
    
    useEffect(() => {
        const getTweet = async () => {
            try {
                const res = await axios.get('/api/tweet/' + ticker)
                const data = res.data.map(data => data)
                // data.map((data, idx) => data.id = idx)
                console.log(data)
                setTweet(data)
            }
            catch(err) {
                console.log(err)
            }
        }
        getTweet()
    }, [])
    

    return(
        <Col sm="3">
        <CardHeader tag="h3">
            {ticker}
        </CardHeader>
          {tweet.map((item, index) => {
              return(
                  <ol key={index}>
                    <Card
                     body
                     coutline
                     color="light"
                    >
                        <CardTitle tag="h5">
                            {item.created_at}
                        </CardTitle>
                        <CardText>
                            {item.text}
                        </CardText>
                        <CardLink href={item.url}>{item.url}</CardLink>

                    </Card>
                  </ol>
              )
          })}
        </Col>
    )
}




export default Tweet
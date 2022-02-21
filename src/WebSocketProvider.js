import React, { useEffect, useState, useRef } from "react";
import styles from "./App.module.css"

const Socket = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const [items, setItems] = useState([]);

    const webSocketUrl = "ws://127.0.0.1:8000/ws/hashtag/a/"
    let ws = useRef(null);

    useEffect(() => {
        if(!ws.current) {
            ws.current = new WebSocket(webSocketUrl);
            console.log(ws.current)
            ws.current.onopen = () => {
                console.log("connected to " + webSocketUrl);
                setSocketConnected(true);
            };
            ws.current.onclose = (error) => {
                console.log("disconnect from " + webSocketUrl);
                console.log(error);
            };
            ws.current.onerror = (error) => {
                console.log("connection error " + webSocketUrl);
                console.log(error);
            };
            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                setItems((prevItems) => [...prevItems, data]);
            };
        }

        return () => {
            console.log("clean up");
            ws.current.close();
        };

    }, [])

    useEffect(() => {
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                    message: sendMessage
                })
            );

            setSendMessage(true);
        }
    }, [socketConnected]);

    useEffect(() => {
        if (sendMessage) {
            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const innerData = JSON.parse(data['message'])
                console.log(innerData)

                if(Object.keys(innerData) == 'name') {
                    setItems(innerData['name']);
                }
                else {
                    setItems([innerData]);
                }     
            }
        }
    })

    return (
    <div className={`${styles.cssdbjc4n} ${styles.rxqd} ${styles.rdwo} ${styles.rqdf} ${styles.rphboty} ${styles.rrsb} ${styles.rifxtd} ${styles.rudhx}`}>
        <div classNmae={styles.cssdbjcn}>
            <section aria-labelledby="accessible-list-20" role="region" classNmae={styles.cssdbjcn}>
                <h1 dir="auto" arial-level="1" role="heading" className={`${styles.cssrbku} ${styles.cssoao} ${styles.riwlz} ${styles.rxkfg} ${styles.ry4c4} ${styles.rudhx} ${styles.rwwvuq} ${styles.rusd} ${styles.rngh}`}>
                    실시간 트렌드
                </h1>
                <div aria-label="타임라인: 실시간 트렌드" className={styles.cssdbjcn}>
                    <div className={styles.cssdbjcn}>
                        <div className={`${styles.cssdbjcn} ${styles.radgll} ${styles.rnyll}`}>
                            <div className={styles.cssdbjcn}>
                                <div className={`${styles.cssdbjcn} ${styles.rwtjep} ${styles.rnyll} ${styles.rymttw} ${styles.rfsjgu}`}>
                                    <h2 aria-level="2" role="heading" className={`${styles.cssrbku} ${styles.cssdbjcn} ${styles.ruiz}`}>
                                        <div className={`${styles.cssdbjcn} ${styles.rky} ${styles.rzfyv} ${styles.rfci}`}></div>
                                            <div className={`${styles.cssoao} ${styles.csscensh} ${styles.rkihuf} ${styles.rjsvk} ${styles.rjjr} ${styles.radywz} ${styles.rvrt} ${styles.rwba} ${styles.rbcqeeo} ${styles.rqvutc}`}>
                                                <span className={`${styles.cssoao} ${styles.cssmy} ${styles.rpoiln} ${styles.rbcqeeo} ${styles.rqvutc}`}>트렌드</span>
                                            </div>
                                    </h2>
                                </div>
                            {items.map((item) => {
                                    return(
                                            <div className={`${styles.cssdbjcn} ${styles.radgll} ${styles.rny4l3l}`}>
                                                <div tabindex="0" className={`${styles.cssdbjcn} ${styles.rloqt} ${styles.rkoalj} ${styles.rnyll} ${styles.rymttw} ${styles.rfsjgu} ${styles.roynqc} ${styles.reg}`}>
                                                    <div className={`${styles.cssdbjcn} ${styles.ryuox} ${styles.rbnwqim}`}>
                                                        <div className={`${styles.cssdbjcn} ${styles.rdksm} ${styles.ruiz} ${styles.rwbha}`}>
                                                            <div className={`${styles.cssoao} ${styles.rjpv} ${styles.rjjr} ${styles.rnv} ${styles.rdba} ${styles.rcwlu} ${styles.rbcqeeo} ${styles.rqvutc}`}>
                                                                <span className={`${styles.cssoao} ${styles.cssmy} ${styles.rpoiln} ${styles.rbcqeeo} ${styles.rqvutc}`}>테마</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div dir="ltr" className={`${styles.cssoao} ${styles.rjsvk} ${styles.rjjr} ${styles.rae} ${styles.rbuq} ${styles.rrjixqe} ${styles.rbcqeeo} ${styles.rvmopo1} ${styles.rqvutc0}`}>
                                                        <span className={`${styles.cssoao} ${styles.cssmy} ${styles.rpoiln} ${styles.rbcqeeo} ${styles.rqvutc}`}>{item}</span>
                                                    </div>
                                                    <div dir="ltr" className={`${styles.cssoao} ${styles.rjpv} ${styles.rjjr} ${styles.rnv} ${styles.rdba} ${styles.rcwlu} ${styles.rgqqx} ${styles.rbcqeeo} ${styles.rqvutc}`} data-testid="metadata">
                                                        <span className={`${styles.cssoao} ${styles.cssmy} ${styles.rpoiln} ${styles.rbcqeeo} ${styles.rqvutc}`}>19000</span>
                                            </div>
                                        </div>
                                    </div>
                                        )
                                }
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    </div>
    );
};

export default Socket;
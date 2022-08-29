import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './component-styles/nutrition-info.scss'

export default function NutritionInfo() {

    return (

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Nutrition Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div id="nutritionfacts">
                    <table width="242" cellSpacing="0" cellPadding="0">
                        <tbody><tr>
                            <td className="header">Nutrition Facts</td>
                        </tr>
                            <tr>
                                <td><div className="serving">Per <span >180.0g</span> Serving Size</div></td>
                            </tr>
                            <tr style={{ height: '7px' }}>
                                <td bgcolor="#000000"></td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: '7pt' }}><div className="line">Amount Per Serving</div></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className="label">Calories
                                            <div className="weight">230</div>
                                        </div>
                                        <div style={{ paddingTop: '1px', float: 'right' }} className="labellight">Calories from Fat
                                            <div className="weight">56</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><div className="line"><div className="dvlabel">% Daily Value<sup>*</sup></div></div></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className
                                            ="label">Total Fat <div className
                                                ="weight">6.2g</div></div>
                                        <div className
                                            ="dv">10%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className
                                        ="line">
                                        <div className
                                            ="labellight">Saturated Fat <div className
                                                ="weight">3.5g</div></div>
                                        <div className
                                            ="dv">17%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className
                                        ="line">
                                        <div className
                                            ="labellight"><i>Trans</i> Fat <div className
                                                ="weight">0.0g</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className
                                            ="label">Cholesterol <div className
                                                ="weight">22mg</div></div>
                                        <div className
                                            ="dv">7%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className
                                            ="label">Sodium <div className
                                                ="weight">618mg</div></div>
                                        <div className
                                            ="dv">26%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className
                                            ="label">Total Carbohydrates <div className
                                                ="weight">32.2g</div></div>
                                        <div className
                                            ="dv">11%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className
                                        ="line">
                                        <div className
                                            ="labellight">Dietary Fiber <div className
                                                ="weight">5.2g</div></div>
                                        <div className
                                            ="dv">21%</div>
                                    </div></td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className
                                        ="line">
                                        <div className
                                            ="labellight">Sugars <div className
                                                ="weight">3.3g</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className
                                        ="line">
                                        <div className
                                            ="label">Protein <div className
                                                ="weight">11.4g</div>
                                        </div>
                                    </div></td>
                            </tr>
                            <tr style={{ height: '7px' }}>
                                <td bgcolor="#000000"></td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="labellight">
                                            * Based on a regular 2000 calorie diet
                                            <br></br><i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody></table>
                </div>


            </AccordionDetails>
        </Accordion>


    )
}
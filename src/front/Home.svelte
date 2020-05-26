<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<main>
    <div class="body">
            
        <img src="imageSOS.png" class="LogoSOS" alt="SOS" width="290" height="215" align="right">
            
        <ul>
            <li><strong>Team</strong>
                <ul>
                    <li><a href="https://github.com/enramir">Enrique Ramos Miró</a></li>
                    <li><a href="https://github.com/jairo25fdez">Jairo Fernández Carmona</a></li>
                    <li><a href="https://github.com/lizethgutierrez">Lizeth Maribel Gutiérrez Mamani</a></li>
                </ul>
            </li>
    
            <li><strong>Project description</strong>: Analysis of the relationship between education quality, employments and woman researchers in Europe.</li>
    
            <li><strong>Repository</strong>: <a href="https://github.com/gti-sos/SOS1920-29">gti-sos/SOS1920-29</a></li>
    
            <li><strong>URL</strong>: <a href="https://sos1920-29.herokuapp.com/">https://sos1920-29.herokuapp.com/</a></li>
    
            <li><strong>APIs (inicialmente vacías, para cargar los recursos --> /api/v?/XXX/loadInitialData)</strong>: 
                <ul>
                    <li><a href="https://sos1920-29.herokuapp.com/api/v2/emp-stats">https://sos1920-29.herokuapp.com/api/v2/emp-stats</a> (developed by <a href="https://github.com/enramir">Enrique Ramos Miró</a>)</li>
                    <li><a href="https://sos1920-29.herokuapp.com/api/v1/edq-stats">https://sos1920-29.herokuapp.com/api/v1/edq-stats</a> (developed by <a href="https://github.com/jairo25fdez">Jairo Fernández Carmona</a>)</li>
                    <li><a href="https://sos1920-29.herokuapp.com/api/v2/womanresearchers-stats">https://sos1920-29.herokuapp.com/api/v2/womanresearchers-stats</a> (developed by <a href="https://github.com/404">Lizeth Maribel Gutiérrez Mamani</a>)</li>
                </ul> 
            </li>
                
            <li><strong>API's GUI:</strong>
                <Button outline color="warning" href="#/emp-stats">Employment statistics</Button>
                <Button color="success" href="#/edq-stats">Education quality stats</Button>
                <p><a href="#/womanresearchers-stats">Frontend Lizeth</a></p>
            </li>
            <li><strong>Visualizations:</strong></li>
    
            <Table style="text-align: center;">
                <thead class="thead-dark">
                    <tr>
                        <th style="vertical-align: middle;">Enrique</th>
                        <th style="vertical-align: middle;">Jairo</th>
                        <th style="vertical-align: middle;">Lizeth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Button outline color="warning" href="#/emp-stats/graph">Employment visualizations (Graph 1)</Button></td>
                        <td><Button color="success" href="#/edq-stats/edq-graphics">EDQ Graphics</Button></td>
                        <td><Button color="danger" href="#/womanresearchers-stats/womanresearchers-graph-one">Women Researchers Graphic</Button></td>
                    </tr>
                    <tr>
                        <td><Button outline color="warning" href="#/emp-stats/graph-two">Employment visualizations (Graph 2)</Button></td>
                        <td></td>
                        <td><Button color="danger" href="">Liz Graphics</Button></td>
                    </tr>
    
                </tbody>
            </Table>
    
            <li><strong>Integrations:</strong>
                <Button color="secondary" href="#/integrations">Integrations</Button>
            </li>
    
            <li><strong>Analytics:</strong>
                <Button color="secondary" href="#/analytics">Integrated visualization</Button>
                
            </li>
            <li><strong>Videos:</strong>
                <ul>
                    <li><h5>Enrique Ramos Miró</h5></li>
                    <li><h5>Jairo Fernández Carmona</h5></li>
                    <li><h5>Lizeth Gutiérrez Mamani</h5></li>
                </ul>
            </li>
            
    
            
        </ul>
    
        
    
    
    </div>
</main>




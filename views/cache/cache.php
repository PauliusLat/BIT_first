<div class="grid-container">
    
    <div class="sm-1">
        <h1 class="tcp">CACHE valdymas</h1>
        <?php
        if (isset($message)) {
            ?>
                <div class='success_message'><?= $message ?></div>
            <?php
        } else {
        } ?>
    </div>

    <div class="sm-1">
        <h2 class="tcp">Išvalyti CACHE</h2>
        <p>Ištrinti visus statinius HTML failus (cache). Po valymo visas turinys bus generuojamas dinamiškai iš naujo sukuriant statinius HTML failus (cache).</p>
        <form action="<?=  get_admin_url().'admin.php?page=cache-0clear' ?>" method="post" >
            <button type="submit" class="btn-blue">Išvalyti</button>
        </form>
    </div>

    <div class="sm-1-2">
        <hr>
    </div>
    
    <div class="sm-1">
        <h2 class="tcp">Deaktyvuoti/Aktyvuoti CACHE</h2>
        
        <form action="<?=  get_admin_url().'admin.php?page=cache-0enable' ?>" method="post" >
            <label class="switch-blue">
                <input type="checkbox" name="thumb-button" <?= $cacheStatus ?>>
                <span></span> 
            </label>
            <p>CACHE įskiepio aktyvavimas/deaktyvavimas modifikuos pagrindinį <i> .htaccess </i> failą.</p>

            <button type="submit" class="btn-blue">Išsaugoti</button>
        </form>

    </div>


    <div class="sm-1-2">
        <hr>
    </div>

</div>




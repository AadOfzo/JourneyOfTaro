import React from 'react';
import SMusicPage from "./styles.MusicPage";
import PageMenu from "../../components/pageMenu/PageMenu";
import TextLogo from "../../assets/images/svg/JourneyOfTaro_Logo_Compass.svg";

function MusicPage() {
    return (
        <>
            <SMusicPage>
                <main className="page-menus-container">
                    <PageMenu
                        pageImage={TextLogo}
                        pageName="Music"
                        pageItemOne="Releases"
                        pageItemTwo="Meditations"
                    />

                    <div className="text-container">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores cum delectus
                            distinctio dolorum eaque error esse excepturi exercitationem fuga illum impedit, ipsam
                            magni,
                            modi nihil nobis, quasi quos sapiente similique tempore! Autem dolorum eligendi eum
                            exercitationem ipsum nulla odit optio pariatur, quas quibusdam, soluta suscipit voluptate.
                            Blanditiis delectus dicta eaque earum eius esse iusto maiores. A ab accusantium amet
                            consequuntur culpa dolorem eum, expedita fugiat id illo in, itaque minus necessitatibus nemo
                            nesciunt praesentium quasi ratione repudiandae velit voluptates? Aperiam architecto illo
                            molestias nam officiis possimus, sed. Accusantium aliquam consectetur corporis culpa
                            cupiditate
                            dolores ea, et, facere facilis iure laudantium libero maiores minus, molestias
                            necessitatibus
                            odio odit pariatur quia quo ratione rerum sapiente sunt voluptate. Accusantium at ex nostrum
                            quos reprehenderit veniam voluptas! Autem eum facilis nemo praesentium repudiandae. Aperiam
                            cumque doloremque est eum, explicabo, labore molestias neque nobis officia repudiandae sint
                            soluta temporibus voluptatem! Accusantium aliquam architecto assumenda atque beatae
                            consequuntur
                            cumque cupiditate dicta, dolor dolorum eum facere fuga hic ipsa laborum maiores modi
                            molestiae
                            nihil nisi perferendis perspiciatis porro praesentium recusandae repellat soluta suscipit
                            totam.
                            Alias aperiam at consequatur eius eligendi et explicabo magni, molestias mollitia nisi
                            pariatur
                            quia rerum, similique sint voluptate? Nam quidem sunt vel.
                        </p>
                    </div>
                </main>
            </SMusicPage>
        </>
    );
}

export default MusicPage;
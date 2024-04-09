import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          quia fugiat nobis dolore! Provident aperiam deserunt, laboriosam
          blanditiis ullam illum. Doloribus voluptatum tenetur in impedit porro
          officiis, voluptates provident neque ipsam. Dolor doloribus id
          repellat modi rerum ipsam sequi iusto obcaecati saepe minima corporis
          aspernatur tempora, perferendis corrupti hic dolore.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          accusamus enim accusantium voluptatem molestias inventore laborum!
          Accusantium architecto eaque velit, nisi voluptatibus libero excepturi
          impedit, quidem, praesentium blanditiis corrupti nesciunt hic illum
          consequuntur dicta aspernatur.
        </p>
      </div>
    </div>
  );
};

export default Biography;

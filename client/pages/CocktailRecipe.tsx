import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Grid, Row, Text } from "@nextui-org/react";

type Drink = {
  drinks: [];
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
};

export default function CocktailRecipe() {
  const [recipes, setRecipes] = useState<any[]>([]);

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.drinks);
        setRecipes(res.data.drinks);
      })
      .catch((err) => console.error(err));
  }, [setRecipes, url]);

  return (
    <Container lg>
      <Grid.Container gap={2} justify="center">
        <Text
          h2
          size={40}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            m: "$10",
          }}
          weight="bold"
        >
          Cocktail Database
        </Text>
        <Grid xs={12} sm={12}>
          {Array.isArray(recipes) ? (
            recipes.map((recipe: Drink) => {
              return (
                <Card
                  variant="shadow"
                  css={{ mr: "$5", mb: "$5" }}
                  key={recipe.idDrink}
                >
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={recipe.strDrinkThumb}
                      objectFit="cover"
                      width="100%"
                      height={400}
                      alt={recipe.strDrink}
                    />
                  </Card.Body>
                  <Card.Footer
                    isBlurred
                    css={{
                      position: "absolute",
                      bgBlur: "#ffffff66",
                      zIndex: 1,
                      bottom: 0,
                    }}
                  >
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text
                        b
                        css={{
                          color: "#ffffff",
                        }}
                      >
                        {recipe.strDrink}
                      </Text>
                      <Text
                        css={{
                          color: "#ffffff",
                          transform: "uppercase",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        {recipe.strInstructions}
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              );
            })
          ) : (
            <p>no data</p>
          )}
        </Grid>
      </Grid.Container>
    </Container>
  );
}

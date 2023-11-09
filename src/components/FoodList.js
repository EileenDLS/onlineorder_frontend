import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);
  // 最开始时curRest没有值，也就是undefined, undefined默认是false,因此if(curRest)后面的内容不会跑

  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {/* .map就是一个遍历的function，遍历这个叫restaurant的list */}
        {restaurants.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {/* 只有当curRest是true的时候，才会返回后面的内容 &(ampersand)*/}
      {curRest && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16, //the gap between list items
            xs: 1,  
            sm: 2,  
            md: 4,  
            lg: 4,  
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ height: 340, width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;
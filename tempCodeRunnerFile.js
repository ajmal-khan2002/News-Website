tatus}`);
        }
        const data = await res.json();
        console.log(data);
        // bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);